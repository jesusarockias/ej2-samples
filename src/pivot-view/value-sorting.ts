
import { PivotView, FieldList } from '@syncfusion/ej2-pivotview';
import { Pivot_Data } from './data-source';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

PivotView.Inject(FieldList);

/**
 * PivotView Value Sorting sample.
 */

this.default = () => {
    let pivotGridObj: PivotView = new PivotView({
        dataSource: {
            valueSortSettings: {
                headerText: 'FY 2015##In Stock',
                headerDelimiter: '##',
                sortOrder: 'Descending'
            },
            values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }],
            formatSettings: [{ name: 'Amount', format: 'C0' }],
            columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
            data: Pivot_Data,
            expandAll: false,
            enableSorting: true,
            rows: [{ name: 'Country' }, { name: 'Products' }],
            filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
        },
        width: '100%',
        enableValueSorting: true,
        height: 300,
        showFieldList: true,
        gridSettings: { columnWidth: 140 }
    });
    pivotGridObj.appendTo('#PivotView');
};
