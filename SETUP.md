# Setup

Instructions to get this app up and running.

I am using Chrome browser, Visual Studio, zsh shell, default git at /usr/bin/git.

# `nvm`, `npm`, `node`

1. Install nvm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    1. The curl command didn’t work out of the box, and it did work after running `touch ~/.zshrc` per the suggestion
    1. Restart the terminal
    1. Verify by running `command -v nvm` and output `nvm`
1. Install node with `nvm install node`
1. Run `npm install -g npm` to get the latest
1. Run `npm install -g npx` if `npx` is not installed
1. Clone the git repo.
1. Run `npm install`.

# Create a React app

(No need to do this now, unless you wanna try spinning up a fresh repo.)

Notes from https://aws.amazon.com/getting-started/hands-on/host-static-website/.

1. **Y** to installing `create-react-app` if it asks
1. Edit line 10 in `src/App.js` to say `Hello, World!`
1. Run `npm start`

# Run the app

Now you can `npm run start` and it will spin up a local instance of the web app.

# Add Jest Testing

Run a global install of Jest: `npm install --save-dev -g jest`

Add Jest to your package.json in scripts:
  `"scripts": {
    "jest": "jest",
  },`

# Deploy

Same as any other `git` repo. Push and it will automatically deploy to skinz.lol.

# amplify-ZUjVi

AKIATIQVMJJYQOTB345N
X8mp5WJkkOLJSsc1ALeLjMaTGpvmNdAsCdjrgcaL

# Backend setup

1. Run `amplify pull --appId d2whjmsl9b7ar1 --envName staging`
1. Run `amplify add auth`