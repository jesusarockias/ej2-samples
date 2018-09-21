/**
 * RichTextEditor inline toolbar sample
 */
import { RichTextEditor, Toolbar, Link, Image, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';
RichTextEditor.Inject(Toolbar, Link, Image, HtmlEditor, QuickToolbar);

this.default = (): void => {
    let defaultRTE: RichTextEditor = new RichTextEditor({
        inlineMode: {
            enable: true,
            onSelection: true
        },
        toolbarSettings: {
            items: ['Bold', 'Italic', 'Underline',
                'Formats', '-', 'Alignments', 'OrderedList', 'UnorderedList',
                'CreateLink']
        },
        format: {
            width: 'auto'
        },
        fontFamily: {
            width: 'auto'
        }
    });
    defaultRTE.appendTo('#defaultRTE');

    let select: CheckBox = new CheckBox({
        // set false for enable the checked state at initial rendering
        checked: true,
        label: 'Show on Selection',
        // bind change event
        change: (args: ChangeEventArgs) => {
            defaultRTE.inlineMode.onSelection = (args as any).checked;
            defaultRTE.dataBind();
        }
    });
    select.appendTo('#select');
};
