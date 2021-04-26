import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter province name")
    .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "Please enter a valid name")
    .trim(),
  customizeSlug: yup.boolean(),
  slugName: yup
    .string()
    // .required("Please choose province")0
    .matches(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Please enter a valid slug"),
  status: yup.boolean(),
});
