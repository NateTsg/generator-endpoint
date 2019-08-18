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


    let answer,model_name
    do{
      answer = await this._ask()
      model_name = answer.cool
      if(model_name.length <= 0){
        break
      }
      do{
        answer = await this._ask_property()
      }while(answer.cool.length> 0 && model_name.length > 0)
    }
    while (model_name.length > 0)

    
  }

  async _ask(){
    // var done = this.async()
    let prompts = [
      {
        type: 'input',
        name: 'cool',
        message: 'What is the model name',
  
      }
      ,
      {
        type: 'input',
        name: 'cool',
        message: 'What is the data type',
  
      }
    ]
    var answer = await this.prompt(prompts)
    return answer
  }
  async _ask_property(){
    // var done = this.async()
    let prompts = [
      {
        type: 'input',
        name: 'cool',
        message: 'What is the property name',
      }
    ]
    var answer = await this.prompt(prompts)
    return answer
  }



  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('temp/index.html'),
      {site_name:"kkk"}
    );
  }
  install() {
    // this.installDependencies();
  }
};
