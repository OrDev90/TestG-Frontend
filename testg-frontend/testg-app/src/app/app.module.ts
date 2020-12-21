import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { ParametersComponent } from './tests/new-test/parameters/parameters.component';
import { ConditionsComponent } from './tests/new-test/conditions/conditions.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestsComponent } from './tests/tests.component';
import { from } from 'rxjs';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { DeleteProjectComponent } from './projects/delete-project/delete-project.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';
import { NewTestComponent } from './tests/new-test/new-test.component';

import { DataServiceProject } from './utils/projects_data_service';
import { DataServiceTest } from './utils/tests_data_service';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { DataServiceParameter } from './utils/parameter_data_service';
import { IntegerComponent } from './tests/new-test/parameters/integer/integer.component';
import { StringComponent } from './tests/new-test/parameters/string/string.component';
import { BooleanComponent } from './tests/new-test/parameters/boolean/boolean.component';
import { NotesComponent } from './tests/new-test/parameters/notes/notes.component';
import { DataServiceCondition } from './utils/condition_data_service';
import { NewConditionComponent } from './tests/new-test/conditions/new-condition/new-condition.component';
import { EventEmitterService } from './event-emitter.service';
import { DataServiceInputField } from './utils/input_field_data_service';
import { SingleValueComponent } from './tests/new-test/parameters/integer/single-value/single-value.component';

@NgModule({
  declarations: [
    AppComponent,
    ParametersComponent,
    ConditionsComponent,
    ProjectsComponent,
    TestsComponent,
    NewProjectComponent,
    DeleteProjectComponent,
    UpdateProjectComponent,
    NewTestComponent,
    IntegerComponent,
    StringComponent,
    BooleanComponent,
    NotesComponent,
    NewConditionComponent,
    SingleValueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DragDropModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [ParametersComponent, NewProjectComponent, DeleteProjectComponent,
    UpdateProjectComponent, IntegerComponent, StringComponent,
    BooleanComponent, NotesComponent, NewConditionComponent, SingleValueComponent],
  providers: [DataServiceProject, DataServiceTest, DataServiceParameter, DataServiceCondition,
     DataServiceInputField,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}, EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
