# pwa-personal-angular
This is a Angular micro-application being served by the main application at https://github.com/coffeestained/pwa-personal-main

# CICD Notes
A simple implementation would be to create the environments you need such as dev, staging, and prod. 
Configure secrets as an example keys with finite permissions for your target server. 
Consider what permissions it may or may not need with Principle of Least Privilege in mind.

- Set secret to build vars.
- Runner stages the repo to the server.
- Set environment, install dependencies, build.
- Clean up environment & artifacts of secrets.

Example github pipeline can be found in the .github folder.