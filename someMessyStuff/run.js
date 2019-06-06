const {SOME_ENV_VAR} = process.env;
console.log(`This var is got from not .sh file and still everything is ok "${SOME_ENV_VAR}"`);
