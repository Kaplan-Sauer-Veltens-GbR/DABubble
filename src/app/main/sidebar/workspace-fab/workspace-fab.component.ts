import { Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { WorkspaceService } from '../../../services/workspace.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'workspace-fab',
  standalone: true,
  imports: [TranslocoModule, CommonModule],
  templateUrl: './workspace-fab.component.html',
  styleUrl: './workspace-fab.component.scss'
})
export class WorkspaceFabComponent {
  workspace: WorkspaceService = inject(WorkspaceService)
}
