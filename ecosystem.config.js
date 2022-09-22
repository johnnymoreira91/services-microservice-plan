module.exports = {
  apps : [{
    name: 'BACK_typescript',
    script: './dist/index.js',
    watch: true,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: "dev",
    },
    env_production: {
      NODE_ENV: "prod",
    }
  }, {
    // script: './service-worker/',
    // watch: ['./service-worker']
  }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
