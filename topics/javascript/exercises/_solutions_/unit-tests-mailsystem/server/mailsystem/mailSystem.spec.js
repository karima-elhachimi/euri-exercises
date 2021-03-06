import mailSystem from './mailSystem';
import smtpTransport from './smtpTransport';
import repository from './repository';

// mock dependencies
jest.mock('./smtpTransport');
jest.mock('./repository');

describe('mainSystem', () => {
  describe('sendWelcomeMail', () => {
    let to;
    let subject;
    let model;

    beforeEach(() => {
      to = 'jane.zoe@euri.com';
      subject = 'Welcome';
      model = {
        name: 'peter',
      };
    });

    afterEach(() => {
      // cleanup locks state and spies
      jest.resetAllMocks();
    });

    it('should have default from address', () => {
      // arrange

      // act
      mailSystem.init();

      // arrange
      expect(mailSystem.fromAddress).toEqual('noreply@euri.com');
    });

    it('should set from address', () => {
      // arrange
      const fromAddress = 'john.bar@euri.com';

      // act
      mailSystem.init(fromAddress);

      // arrange
      expect(mailSystem.fromAddress).toEqual(fromAddress);
    });

    it('should send correct mail', () => {
      // arrange
      const fromAddress = 'john.bar@euri.com';

      // act
      mailSystem.init(fromAddress);
      mailSystem.sendWelcomeMail(to, subject, model);

      // assert
      expect(smtpTransport.send).toHaveBeenCalled();
      const mail = smtpTransport.send.mock.calls[0][0];

      // expect(mail).toMatchSnapshot();
      expect(mail.fromAddress).toEqual(fromAddress);
      expect(mail.subject).toEqual(subject);
      expect(mail.toAddress).toEqual(to);
      expect(mail.body).toMatch('Hello peter');
    });

    it('should use default from address when not provided', () => {
      // arrange

      // act
      mailSystem.init();
      mailSystem.sendWelcomeMail(to, subject, model);

      // assert
      expect(smtpTransport.send.mock.calls[0][0].fromAddress).toBe(
        'noreply@euri.com',
      );
    });
  });

  describe('transferMails', () => {
    it('should transfer filterd mails to backend', () => {
      // arrange
      const backend = {
        transfer: jest.fn(),
      };
      const mails = [
        { id: 123, to: 'peter.cosemans@gmail.com', body: 'aaaa...' },
        { id: 456, to: 'wim.vanhoye@euri.com', body: 'bbb...' },
      ];
      jest.spyOn(repository, 'getMails').mockReturnValue(mails);

      // act
      mailSystem.transferMails(backend);

      // assert
      const filteredMails = backend.transfer.mock.calls[0][0];

      expect(repository.getMails).toHaveBeenCalled();
      expect(backend.transfer).toHaveBeenCalled();
      expect(filteredMails).toBeArrayOfSize(1);
      expect(filteredMails[0].id).toEqual(456);
    });
  });
});
