import * as migration_20261002_094355_initial from './20261002_094355_initial';
import * as migration_20261002_110520_media from './20261002_110520_media';

export const migrations = [
  {
    up: migration_20261002_094355_initial.up,
    down: migration_20261002_094355_initial.down,
    name: '20261002_094355_initial',
  },
  {
    up: migration_20261002_110520_media.up,
    down: migration_20261002_110520_media.down,
    name: '20261002_110520_media'
  },
];
