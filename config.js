var config = {
  REDIS_URL: getEnvironmentVariable('REDIS_URL'),
  PORT: getEnvironmentVariable('PORT'),
};

function getEnvironmentVariable(environment_variable){
  if (process.env[environment_variable] === undefined){
    throw new Error('You must create an environment environment_variable for ' + environment_variable);
  }
  return process.env[environment_variable];
};

module.exports = config;