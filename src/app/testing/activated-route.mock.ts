import { of } from 'rxjs';

export class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => 'test-value',
    },
  };
  queryParams = of({});
}
