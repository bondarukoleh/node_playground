#!/usr/bin/sh
export REPORTER=spec
export MOCHA_OPTS=./mocha.opts
export SPECS=./specs

clear
echo Starting tests!!!
./node_modules/mocha/bin/mocha ${SPECS} --reporter ${REPORTER} --opts ${MOCHA_OPTS}
echo Ending test!!!
