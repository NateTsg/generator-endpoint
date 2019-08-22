'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');


// models = [{model_name:"", model_properties:[property_name:property_value]}]
module.exports = class extends Generator {
  async prompting() {
    this.log("prompting")
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the magnificent ${chalk.red('generator-endpoint')} generator!`)
    );


    let answer,model_name,property_name
    this.userData = []
    do{
      answer = await this._ask()
      
      model_name = answer.cool
      let singleModel = {
        model_name:model_name,
        properties:[]
      }
      if(model_name.length <= 0){
        break
      }
      do{
        property_name = await this._ask_property_name()
        if(property_name.name.length > 0){
          answer = await this._ask_property()
          singleModel.properties.push({
            property_name:property_name.name,
            data_type:answer.data_type,
            default:answer.default,
            required:answer.required
          })
        }
      }while(answer.data_type.length> 0 && model_name.length > 0 && property_name.name.length > 0)
    
      this.userData.push(singleModel)
    }
    while (model_name.length > 0)
    this.log(this.userData)
    this.log(this.userData[0].properties[0])
    
  }

  async _ask(){
    // var done = this.async()
    let prompts = [
      {
        type: 'input',
        name: 'cool',
        message: 'What is the model name',
      }
     
    ]
    var answer = await this.prompt(prompts)
    return answer
  }


  async _ask_property_name(){
    let prompts = [
      {
        type: 'input',
        name: 'name',
        message: '  What is the property name',
      }
     
    ]
    var answer = await this.prompt(prompts)
    return answer
  }
  async _ask_property(){
    // var done = this.async()
    let prompts = [
      {
        type: 'list',
        name: 'data_type',
        message: '    What is the property type',
        choices: [ "Jumbo", "Large", "Standard", "Medium", "Small" ]
      },
      {
        type: 'input',
        name: 'default',
        message: '    What is the default value',
      },
      {
        type: 'confirm',
        name: 'required',
        message: '    is the property required',
      }
    ]
    var answer = await this.prompt(prompts)
    return answer
  }



  writing() {
    this.userData.forEach((data) =>{
      this.fs.copyTpl(
        this.templatePath('model.ejs'),
        this.destinationPath(`models/${data.model_name}.js`),
        {
          schema_name:`${data.model_name}Schema`,
          model_name:`${data.model_name}`,
          plural_form:`${data.model_name}s`,
          properties:JSON.stringify(data.properties)
        }
      );

    })

    this.fs.copyTpl(
      this.templatePath('model.ejs'),
      this.destinationPath('generated/models/temp.js'),
      {
        schema_name:"CustomerSchema",
        model_name:"Customer",
        plural_form:"customers",
        properties:'[{"name":"bill", "age":"26"}, {"name":"jeff", "age":"32"}]'
      }
    );
  }
  install() {
    // this.installDependencies();
  }
};
