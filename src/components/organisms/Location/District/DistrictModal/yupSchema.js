import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter district name")
    .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "Please enter a valid name")
    .trim(),
  customizeSlug: yup.boolean(),
  slugName: yup
    .string()
    .matches(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Please enter a valid slug"),
  provinceId: yup
    .object()
    .required("Please choose a province")
    .nullable(),
  status: yup.boolean(),
});
