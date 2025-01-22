import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';

export default class FontWeight extends Plugin {
    static get requires() {
        return [];
    }

    static get pluginName() {
        return 'FontWeight';
    }

    init() {
        const editor = this.editor;

        // Добавляем новую команду для изменения font-weight.
        editor.commands.add('fontWeight', new FontWeightCommand(editor));

        // Определяем, как атрибут должен отображаться в модели.
        editor.model.schema.extend('$text', { allowAttributes: 'fontWeight' });

        // Конвертер для редактирования
        editor.conversion.for('downcast').attributeToElement({
            model: 'fontWeight',
            view: (attributeValue, { writer }) => {
                if (!attributeValue) {
                    return null;
                }
                return writer.createAttributeElement('span', {
                    style: `font-weight: ${attributeValue}`,
                });
            },
        });

        // Конвертер для данных
        editor.conversion.for('upcast').attributeToAttribute({
            view: {
                name: 'span',
                styles: {
                    'font-weight': /.+/,
                },
            },
            model: {
                key: 'fontWeight',
                value: (viewElement) => viewElement.getStyle('font-weight'),
            },
        });
    }
}

class FontWeightCommand extends Command {
    execute(options) {
        const model = this.editor.model;
        const fontWeight = options.value;

        model.change((writer) => {
            const selection = model.document.selection;

            if (selection.hasAttribute('fontWeight') && selection.getAttribute('fontWeight') === fontWeight) {
                writer.removeSelectionAttribute('fontWeight');
            } else {
                writer.setSelectionAttribute('fontWeight', fontWeight);
            }
        });
    }

    refresh() {
        const selection = this.editor.model.document.selection;
        this.isEnabled = true;
        this.value = selection.getAttribute('fontWeight') || null;
    }
}