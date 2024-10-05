const envVars = process.env;

export default {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT || 8080,
  projectName: envVars.PROJECT_NAME || 'Reapp',
};
