import yaml from 'js-yaml'
import { readdirSync as readdir, readFileSync as readfile } from "fs";
import p from "path";
import { Language } from './src/types';
export default class Lingua {
    #path: string
    #langs?: void | string[]
    #data?: Language[] = []


    /** 
     * Language Utility for [Thaldrin](https://thaldr.in)
     * @param {string} path The Path to your Project's `.yml` Language files
     */
    constructor(path?: string) {
        if (!path) this.#path = "./langs"
        else this.#path = path

        this.#langs = readdir(p.join(__dirname, this.#path)).filter(f => f.endsWith('.yml')) ?? []
        // @ts-ignores
        this.#langs.forEach(file => this.#data.push(yaml.load(readfile(p.join(__dirname, this.#path, file)))))

    }
    // @ts-ignore
    /** 
     * Get a Language by its name
     * @param {string} lang The Language to get. Make sure to have a ```meta.locale``` property in your Language file.
     */

    get(lang: string): Language {
        // @ts-ignore
        let result: Language = this.#data.find(d => d.meta.locale === lang)
        return result
    }
    /** 
     * Get All available Languages
     */
    langs() {
        // @ts-ignore
        let langs = this.#langs.map(f => f.replace('.yml', ''))
        return langs
    }
}