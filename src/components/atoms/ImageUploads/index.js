// import React, { useState, useEffect } from "react";
// import { Image as Img, Input, Icon } from "semantic-ui-react";

// import styles from "./styles.module.css";

// const Render = ({
//     width = "90px",
//     height = "125px",
//     objectFit = "cover",
//     images,
//     onAdd,
//     onActive,
//     onRemove
// }) => (
//     <div className={styles.root}>
//         {images.map((image, i) => (
//         <div
//             key={i}
//             className={styles.imageItem}
//             style={{
//             width,
//             height,
//             backgroundColor: `#${image.active ? `45A163` : `fff`}`
//             }}
//         >
//             <Img
//                 className={styles.image}
//                 style={{ objectFit, opacity: image.active ? 1 : 0.5 }}
//                 key={i}
//                 src={image.src}
//                 size="small"
//                 onClick={_ => onActive(i)}
//             />
//             <Icon
//                 className={styles.closeIcon}
//                 name="window close"
//                 color="red"
//                 onClick={_ => onRemove(i, image.active)}
//             />
//         </div>
//         ))}
//         <div
//             className={styles.addArea}
//             style={{ width, height, lineHeight: `calc(${height} - 14px)` }}
//         >
//             <Input
//                 className={styles.inputFile}
//                 type="file"
//                 multiple
//                 onChange={onAdd}
//             />
//             <Icon name="add circle" size="large" />
//         </div>
//     </div>
// );

// const ImageUploads = ({
//     dataSources = [],
//     config = {
//         width: 480,
//         quality: 0.8
//     },
//     onChange,
//     ...rest
// }) => {
//     const [images, setImages] = useState(dataSources);

//     useEffect(() => {
//         setImages(dataSources)
//     }, [dataSources])

//     const renderProps = {
//         ...rest,
//         images,
//         onAdd: e => {
//         readFiles(e.currentTarget.files, config, image => {
//                 images.push({
//                     active: images.length === 0,
//                     src: image
//                 });
//                 setImages([...images]);
//                 onChange(images);
//             });
//         },
//         onActive: index => {
//             const currentActive = images.findIndex(image => image.active === true);
//             images[currentActive] = {
//                 ...images[currentActive],
//                 active: false
//             };
//             images[index] = {
//                 ...images[index],
//                 active: true
//             };
//             setImages([...images]);
//             onChange(images);
//         },
//         onRemove: (index, active) => {
//             images.splice(index, 1);
//             if (active && images.length > 0) {
//                 images[0] = {
//                 ...images[0],
//                 active: true
//                 };
//             }
//             setImages([...images]);
//             onChange(images);
//         }
//     };
//     return <Render {...renderProps} />;
// };

// const readFile = (file, config, callback) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = event => {
//         const img = new Image();
//         img.src = event.target.result;
//         img.onload = () => {
//             const elem = document.createElement("canvas");
//             const scaleFactor = config.width / img.width;
//             elem.width = config.width;
//             elem.height = img.height * scaleFactor;
//             const ctx = elem.getContext("2d");
//             ctx.drawImage(img, 0, 0, config.width, img.height * scaleFactor);
//             callback(elem.toDataURL("image/jpeg", config.quality));
//         };
//     };
// };

// const readFiles = (files, config, callback) => {
//     for (const file of files) {
//         readFile(file, config, image => callback(image));
//     }
// };

// export default ImageUploads
