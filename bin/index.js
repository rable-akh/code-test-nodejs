#!/usr/bin/env node

const yargs = require("yargs");
const fs = require('fs');

const options = yargs
    .usage("Usage: -f <filename>")
    .options("f", { alias: "filename", describe: "Seed data of collection name", type: "string", demandOption: true })
    .options("a", { alias: "all", describe: "All seed file run", type: "string" })
    .argv;

const greeting = `Hay, I am seeder

        ( -   - )
            |
            -
           ___
           
           `;
console.log(greeting);
console.log(`Seeding to ${options.filename} ...`);
console.log('');
if (options.filename!='all') {
    require(`../src/_seeds/${options.filename}`);
} else if (options.filename == 'all') {
    const path = './src/_seeds/'
    const filesArray = fs.readdirSync(path).filter(file => fs.lstatSync(path+file).isFile())
    filesArray.forEach(element => {
        var fc = element.replace('.js', '');
        require(`../src/_seeds/${fc}`);
    });
}