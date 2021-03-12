import moment from 'moment'

export const makeSlug = str => {
    str = str.toLowerCase();

    str = str.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
    str = str.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
    str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
    str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
    str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
    str = str.replace(/đ/gi, "d");
    str = str.replace(
    /`|~|!|@|#|\||\$|%|\^|&|\*|\(|\)|\+|=|,|\.|\/|\?|>|<|'|"|:|;|_/gi,
    ""
    ); // eslint-disable-line 
    str = str.replace(/ /gi, "-");
    str = str.replace(/-----/gi, "-");
    str = str.replace(/----/gi, "-");
    str = str.replace(/---/gi, "-");
    str = str.replace(/--/gi, "-");
    str = "@" + str + "@";
    str = str.replace(/@-|-@|@/gi, "");
    return str;
};

// export const isFormError = errors => Object.keys(errors).length > 0

// export const formErrorsHandle = (errors, target, error) => {
//     if (error) errors[target] = error
//     else delete errors[target]
//     return errors
// }

export const formatDateTime = (date, pattern = "HH:mm:ss DD/MM/YYYY") => moment(date).format(pattern)

export const formatDate = (date, pattern = "DD/MM/YYYY") => moment(date).format(pattern)