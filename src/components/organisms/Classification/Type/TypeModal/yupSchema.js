import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter type name")
    .matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/, "Please enter a valid name")
    .trim(),
  customizeSlug: yup.boolean(),
  slugName: yup
    .string()
    .matches(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, "Please enter a valid slug"),
  typeGroupId: yup
    .object()
    .required("Please choose a type group")
    .nullable(),
  status: yup.boolean(),
});
