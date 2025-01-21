'use client' // only in App Router

import {CKEditor} from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    InlineEditor,
    BalloonEditor,

    Essentials,
    Heading,

    Bold,
    Italic,
    Underline,

    Link,

    Image,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    ImageInsert,
    SimpleUploadAdapter,

    List,
    ListProperties,

} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

import path from 'path';

const LICENSE_KEY =
    'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzc4NDk1OTksImp0aSI6IjM2ZTg0ODAzLWRmYzUtNGJkYy04MzFjLTI2Y2IzOTY4ZjQyYiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImUwNGJjZTRkIn0.0YnbXyXGoJigqYpCppDQSwJjhK2EgzbUVgpinviafWfICE4rXYpBgzx-OzViEgDeGRc-X8ergYAPjaFpuPyQnQ';

function CustomEditor() {
    return (
        <CKEditor
            editor={InlineEditor}
            config={{
                licenseKey: LICENSE_KEY,
                initialData: 'Welcome to CKEditor 5!',
                placeholder: 'Type or paste your content here!',

                toolbar: {
                    items: ['bold', 'italic', 'underline', '|', 'link', 'insertImage', '|', 'bulletedList'],
                    shouldNotGroupWhenFull: false
                },

                plugins: [
                    Essentials,
                    Heading,

                    Bold,
                    Italic,
                    Underline,

                    Link,

                    Image,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageInsert,
                    ImageInsertViaUrl,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    ImageUpload,
                    SimpleUploadAdapter,

                    List,
                    ListProperties,

                ],

                simpleUpload: {
                    uploadUrl: '/api/upload',
                },
                image: {

                    toolbar: [
                        // 'toggleImageCaption',
                        // 'imageTextAlternative',
                        // '|',
                        // 'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage',
                    ],
                    resizeOptions: [
                        {
                            name: 'resizeImage:25',
                            label: '25%',
                            value: '25',
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50%',
                            value: '50',
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75%',
                            value: '75',
                        },
                        {
                            name: 'resizeImage:original',
                            label: 'Original',
                            value: null,
                        },
                    ],
                    resizeUnit: '%',
                },

                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },

                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
            }}

            onReady={(editor) => {
                //console.log('Editor is ready'); // Убедимся, что редактор готов




                editor.model.schema.extend('imageBlock', {
                    allowAttributes: ['width'],
                });
                //console.log('Schema extended'); // Проверяем расширение схемы
                editor.conversion.for('editingDowncast').add((dispatcher) => {
                    dispatcher.on('insert:imageBlock', (evt, data, conversionApi) => {
                        const viewWriter = conversionApi.writer;
                        const viewFigure = conversionApi.mapper.toViewElement(data.item);

                        // Проверяем, является ли элемент `figure` корректным
                        if (viewFigure && viewFigure.is('element', 'figure')) {
                            //console.log('Modifying figure styles'); // Логируем, что модифицируем figure
                            viewWriter.setStyle('width', '25%', viewFigure); // Устанавливаем ширину на figure
                            viewWriter.addClass('image_resized', viewFigure); // Добавляем класс image_resized
                            viewWriter.addClass('image-style-align-left', viewFigure); // Добавляем класс image_resized





                            setTimeout(() => {
                                const viewImg = Array.from(viewFigure.getChildren()).find((child: any) =>
                                    child.is('element', 'img')
                                );

                                if (!viewImg) {
                                    console.error('Ошибка: Элемент <img> не найден.');
                                    return;
                                }

                                const checkSrcUpdate = () => {
                                    const src = viewImg.getAttribute('src');
                                    if (src && src.startsWith('/uploads/')) {
                                        console.log('src обновлен:', src);
                                        applySrcSet(viewImg, src);
                                    } else if (src && src.startsWith('data:image')) {
                                        console.warn('src пока временный, ждем обновления:', src);
                                        setTimeout(checkSrcUpdate, 0); // Повторяем проверку через 100 мс
                                    } else {
                                        console.error('Ошибка: src остается некорректным:', src);
                                    }
                                };

                                checkSrcUpdate();

                                function applySrcSet(viewImg: any, src: string) {
                                    const originalFileName = extractFileName(src);

                                    if (!originalFileName) {
                                        console.error('Ошибка: Не удалось извлечь имя файла из src:', src);
                                        return;
                                    }

                                    const srcset = [
                                        { size: 320, path: `/uploads/resized/320-${originalFileName}` },
                                        { size: 768, path: `/uploads/resized/768-${originalFileName}` },
                                        { size: 1024, path: `/uploads/resized/1024-${originalFileName}` },
                                        { size: 1920, path: `/uploads/resized/1920-${originalFileName}` },
                                    ]
                                        .map(({ size, path }) => `${path} ${size}w`)
                                        .join(', ');

                                    const sizes = `(max-width: 320px) 320px,
                (max-width: 768px) 768px,
                (max-width: 1024px) 1024px,
                1920px`;

                                    viewWriter.setAttribute('srcset', srcset, viewImg);
                                    viewWriter.setAttribute('sizes', sizes, viewImg);

                                    console.log('Атрибуты srcset и sizes добавлены:', {
                                        src,
                                        srcset,
                                        sizes,
                                    });
                                }

                                function extractFileName(src: string): string | null {
                                    const segments = src.split('/');
                                    return segments.length > 0 ? segments.pop() : null;
                                }
                            }, 0);





                            editor.execute('resizeImage', { width: '25%' });

                            // Обновляем состояние интерфейса, чтобы кнопка "Align Left" была активной
                            const imageStyleCommand = editor.commands.get('imageStyle');
                            if (imageStyleCommand) {
                                // Выполняем команду imageStyle с нужным значением
                                imageStyleCommand.execute({ value: 'alignLeft' });
                            } else {
                                console.error('Команда imageStyle не найдена.');
                            }

                        } else {
                            console.error('Figure not found or invalid');
                        }
                    });
                });
            }}

        />
    );
}

export default CustomEditor;
