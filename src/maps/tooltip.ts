/**
 * Maps Tooltip
 */
import { Maps, MapsTooltip, Legend, ITooltipRenderEventArgs, ILoadEventArgs, MapsTheme, MapAjax } from '@syncfusion/ej2-maps';
Maps.Inject(MapsTooltip, Legend);
/* tslint:disable:no-string-literal */
this.default = (): void => {
    let maps: Maps = new Maps({
        load: (args: ILoadEventArgs) => {
            let theme: string = location.hash.split('/')[1];
            theme = theme ? theme : 'Material';
            args.maps.theme = <MapsTheme>(theme.charAt(0).toUpperCase() + theme.slice(1));
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (!args.options['data']) {
                args.cancel = true;
            }
        },
        titleSettings: {
            text: 'Finalist in Cricket World Cup',
            textStyle: {
                size: '16px'
            }
        },
        zoomSettings: {
            enable: false
        },
        legendSettings: {
            visible: true,
            mode: 'Interactive',
            position: 'Left',
            orientation: 'Vertical',
            height: '70%',
            width: '10'
        },
        layers: [
            {
                shapeData: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/world-map.json'),
                shapePropertyPath: 'name',
                shapeDataPath: 'name',
                dataSource: new MapAjax(location.origin + location.pathname + 'src/maps/map-data/tooltip-datasource.json'),
                tooltipSettings: {
                    visible: true,
                    valuePath: 'name',
                    template: '#template'
                },
                shapeSettings: {
                    fill: '#E5E5E5',
                    colorMapping: [
                        {
                            value: '1',
                            color: '#b3daff'
                        },
                        {
                            color: '#80c1ff',
                            value: '2'
                        },
                        {
                            color: '#1a90ff',
                            value: '3'
                        },
                        {
                            color: '#005cb3',
                            value: '7'
                        }
                    ],
                    colorValuePath: 'value1'
                }
            }
        ]
    });
    maps.appendTo('#container');
};
