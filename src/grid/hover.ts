import { Grid, Page } from '@syncfusion/ej2-grids';
import { productData } from './data-source';

Grid.Inject(Page);

/**
 * Hover sample
 */
this.default = (): void => {
    let grid: Grid = new Grid({
        dataSource: productData,
        allowPaging: true,
        allowSelection: false,
        enableHover: true,
        columns: [
            { field: 'ProductID', headerText: 'Product ID', width: 130, textAlign: 'Right' },
            { field: 'ProductName', headerText: 'Product Name', width: 170 },
            { field: 'UnitPrice', headerText: 'Unit Price', width: 135, textAlign: 'Right', format: 'C2' },
            { field: 'UnitsInStock', headerText: 'Units In Stock', width: 160, textAlign: 'Right' },
            {
                field: 'Discontinued', headerText: 'Discontinued', width: 150, textAlign: 'Center',
                type: 'boolean', displayAsCheckBox: true
            },
        ],
        pageSettings: { pageCount: 5 }
    });
    grid.appendTo('#Grid');
};
