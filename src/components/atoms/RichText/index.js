import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import styles from './styles.scss'

const RichText = ({ 
    label, 
    style = {},
    height = 500, 
    onLoaded,
    ...rest
}) => (
    <div
        style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
        className={styles.root}
    >
        {label && <label>{label}</label>}
        <Editor
            apiKey="xtguhbzamroq55plwax7lrbozu2f9sqioce2mwia4qk82s4a"
            initialValue="<p>This is the initial content of the editor</p>"
            init={{
                setup: function (editor) {
                    editor.on('init', function () {
                        onLoaded()
                    });
                },
                height: height,
                menubar: true,
                plugins: [
                    'advlist autolink lists link charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste powerpaste code help wordcount',
                    'image imagetools'
                ],
                toolbar: `undo redo | bold italic underline strikethrough | 
                        fontselect fontsizeselect formatselect | 
                        alignleft aligncenter alignright alignjustify | 
                        outdent indent |  numlist bullist | forecolor backcolor removeformat | 
                        pagebreak | charmap emoticons | fullscreen  preview save print | 
                        insertfile image media template link anchor codesample | ltr rtl`
                ,
                // images_upload_url: 'postAcceptor.php',
                // /* we override default upload handler to simulate successful upload*/
                // images_upload_handler: function (blobInfo, success, failure) {
                //     setTimeout(function () {
                //         success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                //     }, 2000)
                // }
                file_picker_types: 'image',
                /* and here's our custom image picker*/
                file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    input.onchange = function () {
                        var file = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            var id = 'blobid' + (new Date()).getTime();
                            var blobCache =  window.tinyMCE.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            /* call the callback and populate the Title field with the file name */
                            cb(blobInfo.blobUri(), { title: file.name, width: '50%', height: 'auto' });
                        };
                        reader.readAsDataURL(file);
                    };
                    input.click();
                }

            }}
            {...rest}
        />
    </div>
)

export default RichText