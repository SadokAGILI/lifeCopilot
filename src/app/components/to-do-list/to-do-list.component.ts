import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActionModel } from 'src/app/models/action.model';
import { ActionService } from '../../services/action.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


/**
 * @title Table with selection
 */
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  //standalone: true,
  //imports: [MatTableModule, MatCheckboxModule],
})
export class ToDoListComponent {
  dataSource : any;
  actions: ActionModel[] = [];
  actionInput: string = '';
  actionModel: ActionModel | null = null;
  displayedColumns: string[] = ['select', 'ref', 'description','actions'];
  selection = new SelectionModel<ActionModel>(true, []);
  selectedTodoIds: Set<ActionModel> = new Set();
  selectedRow: ActionModel | null = null; // Variable to track the selected row for editing

  constructor(private actionService: ActionService) {}
  ngOnInit(): void {
    this.loadActions();
  }
  loadActions(): void {
    this.actionService.getTodos().subscribe({
      next: (response) => {
        this.actions = response.data;
        const checkedTodos = this.actions.filter(todo => todo.isDone);
        this.dataSource = new MatTableDataSource<ActionModel>(this.actions);
        console.log(this.dataSource.filteredData);
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      },
    });
  }
  postAction(actionInput: string): void {

    const newGuid = uuidv4();

    const actionModel: ActionModel = {

      actionId: newGuid,
      description: actionInput,
      isDone: false,
      index:0
    };

    this.actionService.postAction(actionModel).subscribe({

      next: (response) => {

        console.log("API sent !");

        this.loadActions();
      },
      error: (error) => {
        console.error('Error posting  action:', error);
      },
    });
  }
  patchAction(selectedRow : ActionModel): void {


   //const newGuid = uuidv4();
/*
    const actionModel: ActionModel = {

      actionId: selectedRow.actionId,
      description: selectedRow.description,
      isDone: selectedRow.isDone
    }; */
    console.log(selectedRow);

    this.actionService.patchAction(selectedRow).subscribe({

      next: (data) => {

        console.log("API sent !");

        this.loadActions();
      },
      error: (error) => {
        console.error('Error posting  action:', error);
      },
    });
  }

  deleteAction(selectedRow: any): void {


     this.actionService.deleteAction(selectedRow.action_Id).subscribe({

       next: (data) => {

         console.log("API sent !");

         this.loadActions();
       },
       error: (error) => {
         console.error('Error posting  action:', error);
       },
     });
   }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ActionModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.actionId + 1
    }`;
  }


  onButtonAdd() {
    // Add the logic you want to execute when Button 1 is clicked
    console.log('Button 1 clicked for:');
    this.postAction(this.actionInput);
     // Show a success alert using SweetAlert2
     Swal.fire({
      title: 'Success!',
      text: 'Action added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
    this.actionInput = '';

  }
  onButtonEdit(element: ActionModel): void {
    // Set the selectedRow when the "Edit" button is clicked
    this.selectedRow = element;
  }

  onButtonSave(element: ActionModel): void {
    // Save logic goes here, you can update your data or make an API call

    // After saving, reset the selectedRow to null to switch back to "Edit" mode
    this.selectedRow = null;
    this.patchAction(element);
  }


  onButtonDelete(element: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!" button
        this.deleteAction(element);
      }
    });
    // Add the logic you want to execute when Button 2 is clicked
   // console.log('Button 2 clicked for:', element);
    //this.deleteAction(element);
  }

   // Function to toggle the selected status of a todo
   toggleTodoSelection(element: ActionModel): void {
    if (this.selectedTodoIds.has(element)) {
      this.selectedTodoIds.delete(element);
    } else {
      this.selectedTodoIds.add(element);
    }
    element.isDone= !element.isDone;
    this.patchAction(element);
  }


}
