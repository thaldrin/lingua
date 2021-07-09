import yaml from 'js-yaml'
import { readdirSync as readdir, readFileSync as readfile } from "fs";
import path from "path";
import { Language } from './src/types';
export default class Lingua {
    #path = './langs'
    #langs?: void | string[]
    #data?: Language[] = []

    constructor() {
        this.#langs = readdir(path.join(__dirname, this.#path)).filter(f => f.endsWith('.yml')) ?? []
        // @ts-ignores
        this.#langs.forEach(file => this.#data.push(yaml.load(readfile(path.join(__dirname, this.#path, file)))))

    }
    // @ts-ignore
    get(lang: string): Language {
        // @ts-ignore
        let result: Language = this.#data.find(d => d.meta.locale === lang)
        return result
    }
}