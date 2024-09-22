import React, {FC, useState} from "react";
import './style/postForm.scss'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import TextField from '@mui/material/TextField';
import {Autocomplete, Button, createTheme, styled, ThemeProvider} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {grey} from "@mui/material/colors";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { doc, setDoc } from "firebase/firestore";
import {formChangeActivity} from "../store/reducers/PostSlice";
import {Timestamp} from "firebase/firestore";
import {fetchLimitedPosts, fetchNewPosts} from "../store/reducers/ActionCreators";
import { ref, uploadBytes, getMetadata, getDownloadURL } from "firebase/storage";


const PostForm: FC<{onModal: () => void}> = ({onModal}) => {

    const {formActive} = useAppSelector(state => state.postReducer)
    const {firestore} = useAppSelector(state => state.firebaseReducer)
    const [isSubmitted, setSubmitted] = useState(false)
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()

    interface IFormInput  {
        title: string,
        descr: string,
        content: string,
        tags: string[],
        coverImg: string | Blob | File,
        date: Timestamp,
    }

    const tags = [
        { value: "Новое", label: "Новое" },
        { value: "Старое", label: "Старое" },
        { value: "Осмысленное", label: "Осмысленное" },
        { value: "Бессмысленное", label: "Бессмысленное" },
        { value: "Другое", label: "Другое" }
    ]

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const uploadTheme = createTheme({
        palette: {
            primary: {
                main: grey[200]
            }
        },
    });
    const submitTheme = createTheme({
        palette: {
            primary: {
                main: grey[800]
            }
        },
    });

    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            title: '',
            descr: '',
            content: '',
            tags: [''],
            date: Timestamp.fromDate(new Date(Date.now()))
        }
    });

   // const storage = getStorage();
    const {storage} = useAppSelector(state => state.firebaseReducer);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        console.log(data)

        // fetch(data.coverImg)
        //     .then(response => response.blob())
        //     .then(blob => {
        //         const storageRef = ref(storage, data.title);
        //         uploadBytes(storageRef, blob).then((snapshot) => {
        //             console.log('Uploaded a string  or file!');
        //         });
        //     })
        //     .catch(error => {
        //         console.error('Error fetching file:', error);
        //     });

        // const fileInput: HTMLInputElement | null = document.querySelector('input[type="file"]');
        // if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        //     console.error('No file selected');
        //     return;
        // }
        // const file: File = fileInput.files[0];
        // console.log(`file is ${file.type}`)
        // const storageRef = ref(storage, data.title);
        // await uploadBytes(storageRef, file);
        // console.log('File uploaded successfully');

        // const storageRef = ref(storage, 'some-child');
        //
        // // 'file' comes from the Blob or File API
        // uploadBytes(storageRef, data.coverImg as unknown as Blob).then((snapshot) => {
        //     console.log('Uploaded a blob or file!');
        // });

        const coverImgRef = ref(storage, `download/${data.title}.jpg`);
        uploadBytes(coverImgRef, data.coverImg as File).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        getDownloadURL(ref(storage, `download/${data.title}.jpg`))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                console.log(`url is: ${url}`)
                data.title = url;
            })
            .catch((error) => {
                // Handle any errors
                console.log(`An error has occurred when getting downloading url`)
            });

        // getMetadata(coverImgRef)
        //     .then((metadata) => {
        //         // Metadata now contains the metadata for 'images/forest.jpg'
        //         console.log(`Full path is: ${metadata.fullPath}`)
        //         data.coverImg = metadata.fullPath;
        //
        //     })
        //     .catch((error) => {
        //         console.log('An error occurred when extracting metadata')
        //     });


        await setDoc(doc(firestore, "posts", data.title), data);
        dispatch(formChangeActivity());
        dispatch(fetchNewPosts(firestore));
        dispatch(fetchLimitedPosts({firestore, start: -4}));
    };

    const toolbarOptions = [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],

        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image'],
    ];


    return (
        <div className={formActive ? 'post__form active' : 'post__form'} onClick={onModal}>
            <div onClick={(e) => {e.stopPropagation()}}>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h2 className="subtitle">Создать пост</h2>
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: 'Необходимо заполнить данное поле'
                        }}
                        render={({ field , fieldState: {error}}) =>
                            <div className='form__field'>
                                <TextField {...field}
                                           id="outlined"
                                           label="Заголовок поста"/>
                                {error ? <span style={{marginTop: "5px", color: "red"}}>{error.message}</span> : null}
                            </div>
                            }
                    />
                    <Controller
                        name="descr"
                        rules={{
                            required: 'Необходимо заполнить данное поле'
                        }}
                        control={control}
                        render={({ field , fieldState: {error}}) =>
                            <div className='form__field'>
                                <TextField {...field}
                                id="outlined-multiline-flexible"
                                label="Краткое описание"
                                multiline
                                max-rows={5}/>
                                {error ? <span style={{marginTop: "5px", color: "red"}}>{error.message}</span> : null}
                            </div>
                    }
                    />
                    <Controller
                        name="content"
                        rules={{
                            required: 'Необходимо заполнить данное поле'
                        }}
                        control={control}
                        render={({ field, fieldState: {error}}) =>
                            <div className='form__field'>
                                <ReactQuill theme="snow"
                                            {...field}
                                            modules={
                                                {
                                                    toolbar: toolbarOptions,
                                                }
                                            }
                                            placeholder="Напишите пост..."
                                            value={value}
                                            onChange={(text) => {
                                                    setValue(text)
                                                    field.onChange(text);
                                                  }}/>
                                {error ? <span style={{marginTop: "5px", color: "red"}}>{error.message}</span> : null}
                            </div>
                    }
                    />
                    <Controller
                        name="tags"
                        rules={{
                            required: 'Необходимо заполнить данное поле'
                        }}
                        control={control}
                        render={({ field: { onChange, value } , fieldState: {error}}) =>
                            <div className='form__field'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={tags}
                                        filterSelectedOptions
                                        getOptionLabel={(option) => option.label}
                                        onChange={(event, values) => onChange(values.map(value => value.value))}
                                        renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Выберите теги"
                                                    placeholder="Новое"
                                                />

                                        )}
                                    />
                                {error ? <span style={{marginTop: "5px", color: "red"}}>{error.message}</span> : null}
                            </div>}
                    />
                    <Controller
                        name="coverImg"
                        control={control}
                        rules={{
                            required: 'Необходимо заполнить данное поле'
                        }}
                        render={({ field , fieldState: {error}}) =>
                            <ThemeProvider theme={uploadTheme} >
                                <Button {...field} component="label" sx={{width: 250}} variant="contained" startIcon={<CloudUploadIcon />}>
                                    Загрузить обложку
                                    <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" />
                                </Button>
                                {error ? <span style={{marginTop: "5px", color: "red"}}>{error.message}</span> : null}
                            </ThemeProvider>
                           }
                    />
                    <ThemeProvider theme={submitTheme} >
                        <Button variant="text" sx={{width: 100}} type='submit'>
                            Отправить
                        </Button>
                    </ThemeProvider>

                </form>
            </div>
        </div>
    )
}

export default PostForm