
import { PivotView } from '@syncfusion/ej2-pivotview';
import { renewableEnergy } from './data-source';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);
/**
 * PivotView sample for Local data source.
 */

this.default = (): void => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            data: renewableEnergy,
            expandAll: false,
            enableSorting: true,
            formatSettings: [{ name: 'ProCost', format: 'C0' }, { name: 'PowUnits', format: 'N0' }],
            drilledMembers: [{ name: 'EnerType', items: ['Biomass', 'Free Energy'] }],
            rows: [
                { name: 'Year', caption: 'Production Year' },
                { name: 'HalfYear', caption: 'Half Year' },
                { name: 'Quarter', caption: 'Quarter' }
            ],
            columns: [
                { name: 'EnerType', caption: 'Energy Type' },
                { name: 'EneSource', caption: 'Energy Source' }
            ],
            values: [
                { name: 'PowUnits', caption: 'Units (GWh)' },
                { name: 'ProCost', caption: 'Cost (MM)' }
            ],
            filters: []
        },
        height: 300,
        width: '100%',
        gridSettings: { columnWidth: 120 }
    });
    pivotGridObj.appendTo('#PivotView1');
};
