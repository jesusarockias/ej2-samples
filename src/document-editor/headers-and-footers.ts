import { DocumentEditor, RequestNavigateEventArgs, ViewChangeEventArgs } from '@syncfusion/ej2-documenteditor';
import { TitleBar } from './title-bar';
import { ToolBar } from './tool-bar';
import { StatusBar } from './status-bar';
import { TextProperties } from './text-properties-pane';
import { TableProperties } from './table-properties-pane';
import { ImageProperties } from './image-properties-pane';
import { DocumentLoader } from './document-loader';
import { HeaderFooterProperties } from './header-footer-pane';
import { TocProperties } from './table-of-contents-pane';
import { PropertiesPane } from './properties-pane';
import { TemplateLoader } from './template-loader';
/**
 * Default document editor sample
 */
//tslint:disable: max-func-body-length
this.default = (): void => {
    //open new tab
    // tslint:disable-next-line:max-line-length
    document.getElementById('newTab').setAttribute('href', location.href.split('#')[0] + 'document-editor/headers-and-footers/index.html#fabric');
    let containerPanel: HTMLElement = document.getElementById('documenteditor_container_body');
    updateContainerSize();
    let documenteditor: DocumentEditor = new DocumentEditor({ isReadOnly: false });
    documenteditor.acceptTab = true;
    documenteditor.enableAllModules();
    documenteditor.pageOutline = '#E0E0E0';
    documenteditor.appendTo('#container');
    documenteditor.selectionChange = () => {
        setTimeout(() => { onSelectionChange(); }, 20);
    };
    documenteditor.documentChange = (): void => {
        toolbar.updateUndoRedoBtn();
        toolbar.isContentChange = false;
        applyPageCountAndDocumentTitle();
        fontProperties.updateStyles();
    };
    documenteditor.contentChange = (): void => {
        toolbar.isContentChange = true;
        if (!toolbar.isReadOnly) {
            toolbar.updateUndoRedoBtn();
        }
        //Set page count
        statusBar.updatePageCount();
    };
    window.addEventListener('resize', (): void => { onWindowResize(); });
    //Initializes property pane.
    let tocProperties: TocProperties = new TocProperties(documenteditor);
    let headerFooter: HeaderFooterProperties = new HeaderFooterProperties(documenteditor);
    let fontProperties: TextProperties = new TextProperties(documenteditor, 'textProperty');
    let imageProperties: ImageProperties = new ImageProperties(documenteditor);
    let tableProperties: TableProperties = new TableProperties(documenteditor, imageProperties, fontProperties);
    // tslint:disable-next-line:max-line-length
    let propertiesPane: PropertiesPane = new PropertiesPane(documenteditor, fontProperties, tableProperties, headerFooter, imageProperties, tocProperties);
    //Initializes document editor toolbar and events.
    // tslint:disable-next-line:max-line-length
    let toolbar: ToolBar = new ToolBar(documenteditor, document.getElementById('documenteditor_toolbar'), propertiesPane);
    toolbar.documentLoader = new DocumentLoader(documenteditor);
    toolbar.templateLoader = new TemplateLoader();
    if (!toolbar.isReadOnly) {
        toolbar.updateUndoRedoBtn();
    }
    document.getElementById('documenteditor_titlebar').style.display = '';
    document.getElementById('documenteditor_statusbar').style.display = '';
    let titleBar: TitleBar = new TitleBar(document.getElementById('documenteditor_titlebar'), documenteditor, true);
    let statusBar: StatusBar = new StatusBar(document.getElementById('documenteditor_statusbar'), documenteditor);
    updateContainerSize();
    documenteditor.resize();
    onLoadDefault();
    applyPageCountAndDocumentTitle();
    showPropertiesPaneOnInitial();
    documenteditor.requestNavigate = (args: RequestNavigateEventArgs) => {
        if (args.linkType !== 'Bookmark') {
            let link: string = args.navigationLink;
            if (args.localReference.length > 0) {
                link += '#' + args.localReference;
            }
            window.open(link);
            args.isHandled = true;
        }
    };
    documenteditor.zoomFactorChange = (): void => {
        statusBar.updateZoomContent();
    };
    documenteditor.viewChange = (e: ViewChangeEventArgs): void => {
        statusBar.updatePageNumberOnViewChange(e);
    };
    function onValueChange(args: any): void {
        documenteditor.zoomFactor = parseInt(args.value as any, 10) / 100;
    }
    function applyPageCountAndDocumentTitle(): void {
        //Sets Document name.
        titleBar.updateDocumentTitle();
        statusBar.updatePageCount();
    }
    function updateContainerSize(): void {
        let titleBarDiv: HTMLElement = document.getElementById('documenteditor_titlebar');
        let statusBarDiv: HTMLElement = document.getElementById('documenteditor_statusbar');
        let toolBarDiv: HTMLElement = document.getElementById('documenteditor_toolbar');
        if (containerPanel && titleBarDiv && statusBarDiv && toolBarDiv) {
            containerPanel.style.height = (window.innerHeight - (titleBarDiv.offsetHeight
                + toolBarDiv.offsetHeight + statusBarDiv.offsetHeight)) + 'px';
        }
    }
    function showPropertiesPaneOnInitial(): void {
        toolbar.showPropertiesPaneOnSelection();
    }
    function onSelectionChange(): void {
        if (documenteditor.selection) {
            statusBar.startPage = documenteditor.selection.startPage;
            statusBar.updatePageNumber();
            toolbar.showPropertiesPaneOnSelection();
        }
    }

    function onLoadDefault(): void {
        // tslint:disable
        let defaultDocument: object = {"sections":[{"blocks":[{"paragraphFormat":{"styleName":"Normal"},"inlines":[{"text":"Lorem ipsum dolor sit "},{"text":"amet"},{"text":", "},{"text":"consectetur"},{"text":" "},{"text":"adipiscing"},{"text":" "},{"text":"elit"},{"text":", "},{"text":"sed"},{"text":" do "},{"text":"eiusmod"},{"text":" "},{"text":"tempor"},{"text":" "},{"text":"incididunt"},{"text":" "},{"text":"ut"},{"text":" "},{"text":"labore"},{"text":" et dolore magna "},{"text":"aliqua"},{"text":". Ut "},{"text":"enim"},{"text":" ad minim "},{"text":"veniam"},{"text":", "},{"text":"quis"},{"text":" "},{"text":"nostrud"},{"text":" exercitation "},{"text":"ullamco"},{"text":" "},{"text":"laboris"},{"text":" nisi "},{"text":"ut"},{"text":" "},{"text":"aliquip"},{"text":" ex "},{"text":"ea"},{"text":" "},{"text":"commodo"},{"text":" "},{"text":"consequat"},{"text":". Duis "},{"text":"aute"},{"text":" "},{"text":"irure"},{"text":" dolor in "},{"text":"reprehenderit"},{"text":" in "},{"text":"voluptate"},{"text":" "},{"text":"velit"},{"text":" "},{"text":"esse"},{"text":" "},{"text":"cillum"},{"text":" dolore "},{"text":"eu"},{"text":" "},{"text":"fugiat"},{"text":" "},{"text":"nulla"},{"text":" "},{"text":"pariatur"},{"text":". "},{"text":"Excepteur"},{"text":" "},{"text":"sint"},{"text":" "},{"text":"occaecat"},{"text":" "},{"text":"cupidatat"},{"text":" non "},{"text":"proident"},{"text":", "},{"text":"sunt"},{"text":" in culpa qui "},{"text":"officia"},{"text":" "},{"text":"deserunt"},{"text":" "},{"text":"mollit"},{"text":" "},{"text":"anim"},{"text":" id "},{"text":"est"},{"text":" "},{"text":"laborum"},{"text":"."}]},{"paragraphFormat":{"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","styleName":"Normal"},"inlines":[{"text":"\f"},{"name":"_GoBack","bookmarkType":0},{"name":"_GoBack","bookmarkType":1}]},{"characterFormat":{"fontFamily":"Comic Sans MS"},"paragraphFormat":{"styleName":"Normal"},"inlines":[{"text":"Lorem ipsum dolor sit ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"amet","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":", ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"consectetur","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"adipiscing","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"elit","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":", ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"sed","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" do ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"eiusmod","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"tempor","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"incididunt","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"ut","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"labore","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" et dolore magna ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"aliqua","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":". Ut ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"enim","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ad minim ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"veniam","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":", ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"quis","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"nostrud","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" exercitation ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"ullamco","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"laboris","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" nisi ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"ut","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"aliquip","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ex ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"ea","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"commodo","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"consequat","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":". Duis ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"aute","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"irure","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" dolor in ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"reprehenderit","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" in ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"voluptate","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"velit","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"esse","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"cillum","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" dolore ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"eu","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"fugiat","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"nulla","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"pariatur","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":". ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"Excepteur","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"sint","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"occaecat","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"cupidatat","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" non ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"proident","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":", ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"sunt","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" in culpa qui ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"officia","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"deserunt","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"mollit","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"anim","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" id ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"est","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":" ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"laborum","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":".","characterFormat":{"fontFamily":"Comic Sans MS"}}]},{"paragraphFormat":{"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","styleName":"Normal"},"inlines":[{"text":"\f"}]},{"characterFormat":{"fontFamily":"Book Antiqua"},"paragraphFormat":{"styleName":"Normal"},"inlines":[{"text":"Lorem ipsum dolor sit ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"amet","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":", ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"consectetur","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"adipiscing","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"elit","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":", ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"sed","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" do ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"eiusmod","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"tempor","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"incididunt","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"ut","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"labore","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" et dolore magna ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"aliqua","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":". Ut ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"enim","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ad minim ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"veniam","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":", ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"quis","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"nostrud","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" exercitation ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"ullamco","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"laboris","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" nisi ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"ut","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"aliquip","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ex ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"ea","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"commodo","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"consequat","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":". Duis ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"aute","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"irure","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" dolor in ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"reprehenderit","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" in ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"voluptate","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"velit","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"esse","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"cillum","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" dolore ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"eu","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"fugiat","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"nulla","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"pariatur","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":". ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"Excepteur","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"sint","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"occaecat","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"cupidatat","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" non ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"proident","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":", ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"sunt","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" in culpa qui ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"officia","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"deserunt","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"mollit","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"anim","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" id ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"est","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":" ","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"laborum","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":".","characterFormat":{"fontFamily":"Book Antiqua"}}]},{"paragraphFormat":{"styleName":"Normal"},"inlines":[]}],"headersFooters":{"header":{"blocks":[{"characterFormat":{"fontSize":18.0,"fontFamily":"Book Antiqua"},"paragraphFormat":{"textAlignment":"Right","styleName":"Header"},"inlines":[{"text":"This is odd page header.","characterFormat":{"fontSize":18.0,"fontFamily":"Book Antiqua"}}]}]},"footer":{"blocks":[{"characterFormat":{"fontFamily":"Book Antiqua"},"paragraphFormat":{"styleName":"Footer","tabs":[{"tabJustification":"Left","position":0.0,"tabLeader":"None","deletePosition":234.0}]},"inlines":[{"text":"This is odd page footer","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"\t","characterFormat":{"fontFamily":"Book Antiqua"}},{"text":"Page ","characterFormat":{"fontFamily":"Book Antiqua"}},{"hasFieldEnd":true,"fieldType":0},{"text":" PAGE   \\* MERGEFORMAT ","characterFormat":{"fontFamily":"Book Antiqua"}},{"fieldType":2},{"text":"1","characterFormat":{"fontFamily":"Book Antiqua"}},{"fieldType":1}]}]},"evenHeader":{"blocks":[{"characterFormat":{"fontSize":18.0,"fontFamily":"Comic Sans MS"},"paragraphFormat":{"textAlignment":"Right","styleName":"Header"},"inlines":[{"text":"This is even page header","characterFormat":{"fontSize":18.0,"fontFamily":"Comic Sans MS"}}]}]},"evenFooter":{"blocks":[{"characterFormat":{"fontFamily":"Comic Sans MS"},"paragraphFormat":{"styleName":"Footer","tabs":[{"tabJustification":"Left","position":0.0,"tabLeader":"None","deletePosition":234.0}]},"inlines":[{"text":"This is even page footer","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"\t","characterFormat":{"fontFamily":"Comic Sans MS"}},{"text":"Page ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"hasFieldEnd":true,"fieldType":0},{"text":" PAGE   \\* MERGEFORMAT ","characterFormat":{"fontFamily":"Comic Sans MS"}},{"fieldType":2},{"text":"1","characterFormat":{"fontFamily":"Comic Sans MS"}},{"fieldType":1}]}]},"firstPageHeader":{"blocks":[{"characterFormat":{"fontSize":20.0},"paragraphFormat":{"textAlignment":"Right","styleName":"Normal"},"inlines":[{"text":"This is first page header","characterFormat":{"fontSize":20.0}}]},{"paragraphFormat":{"styleName":"Normal"},"inlines":[]}]},"firstPageFooter":{"blocks":[{"paragraphFormat":{"styleName":"Footer","tabs":[{"tabJustification":"Left","position":0.0,"tabLeader":"None","deletePosition":234.0}]},"inlines":[{"text":"This is first page footer"},{"text":"\t"},{"text":"Page "},{"hasFieldEnd":true,"fieldType":0},{"text":" PAGE   \\* MERGEFORMAT "},{"fieldType":2},{"text":"1"},{"fieldType":1}]}]}},"sectionFormat":{"headerDistance":36.0,"footerDistance":36.0,"pageWidth":612.0,"pageHeight":792.0,"leftMargin":72.0,"rightMargin":72.0,"topMargin":72.0,"bottomMargin":72.0,"differentFirstPage":true,"differentOddAndEvenPages":true}}],"characterFormat":{"fontSize":11.0,"fontFamily":"Calibri"},"paragraphFormat":{"afterSpacing":8.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple"},"background":{"color":"#FFFFFFFF"},"styles":[{"type":"Paragraph","name":"Normal","next":"Normal","paragraphFormat":{"lineSpacing":1.0666667222976685,"lineSpacingType":"Multiple"}},{"type":"Character","name":"Default Paragraph Font"},{"type":"Paragraph","name":"Notes","basedOn":"Normal","next":"Normal","characterFormat":{"bold":true},"paragraphFormat":{"afterSpacing":6.0,"lineSpacing":1.0,"lineSpacingType":"Multiple"}},{"type":"Paragraph","name":"Header","basedOn":"Normal","next":"Normal","link":"Header Char","paragraphFormat":{"afterSpacing":0.0,"lineSpacing":1.0,"lineSpacingType":"Multiple","tabs":[{"tabJustification":"Center","position":234.0,"tabLeader":"None","deletePosition":0.0},{"tabJustification":"Right","position":460.0,"tabLeader":"None","deletePosition":0.0}]}},{"type":"Character","name":"Header Char","basedOn":"Default Paragraph Font"},{"type":"Paragraph","name":"Footer","basedOn":"Normal","next":"Normal","link":"Footer Char","paragraphFormat":{"afterSpacing":0.0,"lineSpacing":1.0,"lineSpacingType":"Multiple","tabs":[{"tabJustification":"Center","position":234.0,"tabLeader":"None","deletePosition":0.0},{"tabJustification":"Right","position":460.0,"tabLeader":"None","deletePosition":0.0}]}},{"type":"Character","name":"Footer Char","basedOn":"Default Paragraph Font"},{"type":"Paragraph","name":"Title","basedOn":"Normal","next":"Normal","link":"Title Char","characterFormat":{"fontSize":28.0,"fontFamily":"Calibri Light"},"paragraphFormat":{"afterSpacing":0.0,"lineSpacing":1.0,"lineSpacingType":"Multiple"}},{"type":"Character","name":"Title Char","basedOn":"Default Paragraph Font","characterFormat":{"fontSize":28.0,"fontFamily":"Calibri Light"}}]};
        // tslint:enable
        let waitingPopUp: HTMLElement = document.getElementById('waiting-popup');
        let popupOverlay: HTMLElement = document.getElementById('popup-overlay');
        waitingPopUp.style.display = 'block';
        documenteditor.open(JSON.stringify(defaultDocument));
        documenteditor.documentName = 'Headers and Footers';
        waitingPopUp.style.display = 'none';
        popupOverlay.style.display = 'none';
        documenteditor.focusIn();
        fontProperties.updateStyles();
    }
    function onWindowResize(): void {
        updateContainerSize();
    }
};
