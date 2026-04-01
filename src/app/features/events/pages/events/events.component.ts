import {Component, OnInit, inject, signal, ChangeDetectionStrategy, DestroyRef} from '@angular/core';
import { ApiService } from '@core/services/api.service';
import {event} from '@features/events/models/events.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {EventsService} from '@features/events/services/events.service';
import {KeyValuePipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInput, MatButton, MatIconButton, MatIconModule, KeyValuePipe
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
  private apiService = inject(ApiService);
  private eventsService = inject(EventsService);

  private destroyRef = inject(DestroyRef);
  isLoading = signal(false);
  groupedEvents = this.eventsService.groupedEvents;


  form = new FormGroup({
    region: new FormControl(''),
    weapon: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    paid: new FormControl(''),
    series: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    name: new FormControl('')
  });



  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading.set(true);
    this.apiService.get<event[]>('events').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
        this.eventsService.rawEvents.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Ошибка загрузки событий', err);
        this.isLoading.set(false);
      }
    });
  }

  reset() {
    //toDO reset form
  }
}
