import { HeatMap, Legend, Tooltip, Adaptor, ILoadedEventArgs, ITooltipEventArgs, HeatMapTheme } from '@syncfusion/ej2-heatmap';
import { SampleDataSource } from './data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
HeatMap.Inject(Tooltip, Legend, Adaptor);

/**
 * Sample for Line serie
 */
this.default = (): void => {
    let newDataSource: SampleDataSource = new SampleDataSource();
    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Hourly Weather Forecast (in Celsius)',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'Segoe UI'
            }
        },
        xAxis: {
            labels: ['London', 'Berlin', 'Madrid', 'Paris', 'Rome', 'Lisbon', 'Dublin']
        },
        yAxis: {
            labels: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM',
                '2PM', '4PM', '6PM', '8PM', '10PM']
        },
        cellSettings: {
            showLabel: false,
            format: '{value} C'
        },
        dataSource: newDataSource.legentSampleData,
        paletteSettings: {
            palette: [{ value: 0, color: '#6EB5D0' },
            { value: 10, color: '#7EDCA2' },
            { value: 20, color: '#DCD57E' },
            ]
        },
        legendSettings: {
            position: 'Left',
        },
        tooltipRender: (args: ITooltipEventArgs) => {
            args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + '\xB0 C'];
        },
        load: (args: ILoadedEventArgs) => {
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        },
    });
    heatmap.appendTo('#container');

    let legentListObj: DropDownList = new DropDownList({
        index: 0,
        popupHeight: '200px',
        change: () => { valueXChange(); }
    });
    legentListObj.appendTo('#LegendPosition');

    function valueXChange(): void {
        heatmap.legendSettings.position = legentListObj.value.toString() === 'Right' ?
            'Right' : legentListObj.value.toString() === 'Bottom' ?
                'Bottom' : legentListObj.value.toString() === 'Left' ?
                    'Left' : legentListObj.value.toString() === 'Top' ? 'Top' : null;
    }
};