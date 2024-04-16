const envVars = process.env;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  projectName: envVars.PROJECT_NAME || 'Reapp',
};
