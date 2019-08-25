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
          console.log(answer)
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
     console.log("======------===== ASkkkk")
    // var done = this.async()
    let prompts = [
      {
        type: 'list',
        name: 'data_type',
        message: '    What is the property type',
        choices: [ "String", "Large", "Standard", "Medium", "Small" ]
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
        this.destinationPath(`generated/ThisApp/src/models/${data.model_name}.js`),
        {
          schema_name:`${data.model_name}Schema`,
          model_name:`${data.model_name}`,
          plural_form:`${data.model_name}s`,
          properties:JSON.stringify(data.properties)
        }
      );
      
      this.fs.copyTpl(
        this.templatePath('controller.ejs'),
        this.destinationPath(`generated/ThisApp/src/controllers/${data.model_name}Controller.js`),
        {
          schema_name:`${data.model_name}Schema`,
          model_name:`${data.model_name}`,
          plural_form:`${data.model_name}s`,
          properties:JSON.stringify(data.properties)
        }
      );
    })
    this._writeDefaults()
    
  }

  async _writeDefaults(){
    //Config
    this.fs.copyTpl(
      this.templatePath('configs/config.js'),
      this.destinationPath(`generated/ThisApp/src/configs/config.js`),
      {
        app_name:`immerce`
      }
    );
    this.fs.copyTpl(
      this.templatePath('configs/initializeDb.js'),
      this.destinationPath(`generated/ThisApp/src/configs/initializeDb.js`),
      {
        app_name:`immerce`
      }
    );
    //middlewares
    this.fs.copyTpl(
      this.templatePath('middlewares/AuthMiddleware.js'),
      this.destinationPath(`generated/ThisApp/src/middlewares/AuthMiddleware.js`),
      {
        app_name:`immerce`
      }
    );
    //routes
    this.fs.copyTpl(
      this.templatePath('routes/routes.js'),
      this.destinationPath(`generated/ThisApp/src/routes/routes.js`),
      {
        models:JSON.stringify(this.userData)
      }
    );
    //default model
    this.fs.copyTpl(
      this.templatePath('models/User.js'),
      this.destinationPath(`generated/ThisApp/src/models/User.js`),
      {
        app_name:`immerce`
      }
    );
    //default controller
    this.fs.copyTpl(
      this.templatePath('controllers/UserController.js'),
      this.destinationPath(`generated/ThisApp/src/controllers/UserController.js`),
      {
        app_name:`immerce`
      }
    );
    //index
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`generated/ThisApp/src/index.js`),
      {
        app_name:`immerce`
      }
    );
    //package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`generated/ThisApp//package.json`),
      {
        app_name:`immerce`
      }
    );

  
  }
  install() {
    // this.installDependencies();
    // this.npmInstall();
  }
};
