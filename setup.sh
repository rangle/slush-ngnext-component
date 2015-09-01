#!/bin/bash
# Sample setup script
git clone https://github.com/rangle/slush-ngnext-component.git
cd slush-ngnext-component
npm install
mkdir test
cd test
npm link ../