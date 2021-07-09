// import en_US from "./src/en_US";
// import de_DE from "./src/de_DE";

// export default {
//     en_US,
//     de_DE
// }

// export default class Lingua {
//     constructor() {

//     }
// }

import jsyaml from 'js-yaml'
// import yaml from 'yaml'

import fs from 'fs'



try {
    const file1 = fs.readFileSync('./langs/1.yml', 'utf8')
    const file2 = fs.readFileSync('./langs/2.yml', 'utf8')
    const Doc = jsyaml.loadAll(file1)

    console.log(Doc)
} catch (error) {
    console.log(error)

}