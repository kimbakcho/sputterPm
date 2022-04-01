export default class Preference {

    static backEndBase = process.env.NODE_ENV === 'production'
        ? '/bsputterpm' : "/bsputterpm"
}