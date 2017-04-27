INSERT INTO IIS.INMATE_MOVEMENT (
    PKTS_INMATE_MOVEMENT,
    ESTAB_COMP_OF_MOVE,
    TEMPORARY_ABSENCE_TYPE,
    REASON_FOR_TRANSFER,
    DATE_OF_MOVE,
    TIME_OF_MOVE,
    MOVEMENT_CODE,
    DISCHARGED_TO_COURT_CODE,
    ESCORT_TYPE,
    TYPE_OF_MOVE,
    XIDBKEY,
    FK_PRISON_NUMBER)

VALUES
    ('1231', 'BAAM', 0, '00', '19870928', 70000,  'N ', '0000', ' ', 'R', 1.0, 'AB111111'),
    ('1232', 'BAAM', 0, '00', '19871221', 90000,  'DC', '0000', ' ', 'D', 1.0, 'AB111111'),
    ('1233', 'DMAM', 0, '00', '19871221', 170000, 'N ', '0000', ' ', 'R', 1.0, 'AB111111'),
    ('1234', 'FKAM', 0, '00', '19880212', 90000,  'DC', '0000', ' ', 'D', 1.0, 'AB111111'),
    ('1235', 'FNBM', 0, '00', '19880212', 170000, 'W ', '0000', ' ', 'R', 1.0, 'AB111112'),
    ('1236', 'LLCM', 0, '00', '19880330', 220000, 'TI', '0000', ' ', 'D', 1.0, 'AB111112'),
    ('1237', 'WDIM', 0, '00', '19880330', 230000, 'M ', '0000', ' ', 'R', 1.0, 'AB111112'),
    ('1238', 'DMIM', 0, '00', '19891026', 170000, 'W ', '0000', ' ', 'R', 1.0, 'AB111112'),
    ('1239', 'FKIM', 0, '00', '19891130', 233000, 'YP', '0000', ' ', 'D', 1.0, 'AB111112');

GO
