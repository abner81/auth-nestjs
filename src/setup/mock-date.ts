const mockDate = new Date('2023-10-01T10:20:30Z');

jest
  .spyOn(global, 'Date')
  .mockImplementation(() => mockDate as unknown as Date);
