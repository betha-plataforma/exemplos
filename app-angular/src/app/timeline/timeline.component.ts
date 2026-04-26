import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TimelineEvento {
  readonly data: string;
  readonly hora: string;
  readonly descricao: string;
  readonly possuiLinkHistorico: boolean;
}

interface TimelineGrupo {
  readonly mes: string;
  readonly dia: string;
  readonly eventos: readonly TimelineEvento[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  protected readonly grupos: readonly TimelineGrupo[] = [
    {
      mes: 'Março/2021',
      dia: 'Qua, 17/10',
      eventos: [
        {
          data: '10:30:42',
          hora: '10:30:42',
          descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          possuiLinkHistorico: true,
        },
        {
          data: '09:15:21',
          hora: '09:15:21',
          descricao:
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          possuiLinkHistorico: false,
        },
      ],
    },
    {
      mes: 'Fevereiro/1985',
      dia: 'Seg, 16/02',
      eventos: [
        {
          data: '10:30:42',
          hora: '10:30:42',
          descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          possuiLinkHistorico: true,
        },
        {
          data: '09:15:21',
          hora: '09:15:21',
          descricao:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          possuiLinkHistorico: false,
        },
      ],
    },
  ];
}
