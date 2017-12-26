/**
 * Created by reditaru on 2017/12/27.
 */
function mapValues (obj, f) {
    const res = {}
    Object.keys(obj).forEach(key => {
        res[key] = f(obj[key], key)
    })
    return res
}

export function namespace (module, types) {
    return mapValues(types, (names, type) => {
        return mapValues(names, name => {
            return module + '/' + name
        })
    })
}