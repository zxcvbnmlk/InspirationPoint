import {Injectable, signal, computed } from '@angular/core';

import {displayEvent, event, } from '@features/events/models/events.model';




@Injectable({ providedIn: 'root' })
export class EventsService {
  public rawEvents = signal<event[]>([]);

  // Маппинги кодов в значения
  private weaponMap: Record<string, string> = { E: 'Шпага', F: 'Рапира', S: 'Сабля' };
  private genderMap: Record<string, string> = { M: 'М', F: 'Ж' };
  private ageMap: Record<string, string> = {
    J: 'Юниоры',
    A: 'Взрослые',
    C: 'Дети',
    '': 'Не указано'
  };
  private typeMap: Record<string, string> = { I: 'Личные', T: 'Командные' };

  private transformEvents(events: event[]): displayEvent[] {
    return events.map(ev => {
      const rawDate = new Date(ev.start) ;
      return {
        id: ev.event_id,
        name: ev.event_name,
        region: 'Россия', // добавить поле city в API
        gender: this.genderMap[ev.gender] || 'Не указан',
        weapon: this.weaponMap[ev.weapon] || ev.weapon,
        age: this.ageMap[ev.age] || ev.age,
        type: this.typeMap[ev.type] || ev.type,
        rawDate,
        displayDate: rawDate.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };
    });
  }

  //Todo Сортируем события по дате, можно будет убрать, если будут приходить отсортированные
  private sortEventsByDate(events: displayEvent[]): displayEvent[] {
    return [...events].sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
  }


  private groupEventsByDate(events: displayEvent[]): Map<string, displayEvent[]> {
    const groups = new Map<string, displayEvent[]>();

    const sortedEvents = this.sortEventsByDate(events);


    for (const event of sortedEvents) {
      const key = event.displayDate;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(event);
    }
    return groups;
  }

  public groupedEvents = computed(() => {
    const transformed = this.transformEvents(this.rawEvents());
    return this.groupEventsByDate(transformed);
  });


}

