import { describe, it } from 'mocha';
import { expect } from 'chai';
import { spawn } from 'child_process';
import CheckRoute from '../src/checkRoute.class';
import NewDirectory from '../src/newDirectory.class';

describe('Testing Path checker ', () => {
  describe('when a directory is introduced', () => {
    const directoryRoute: CheckRoute = new CheckRoute('./database');
    it('type value is directory', () => {
      expect(directoryRoute.route).to.be.eq('./database');
      expect(directoryRoute.type).to.be.eq('directory');
    });
    it('on route value change to file, type value is changed', () => {
      directoryRoute.route = './package.json';
      expect(directoryRoute.route).to.be.eq('./package.json');
      expect(directoryRoute.type).to.be.eq('file');
    });
    it('on non existing route type is none', () => {
      directoryRoute.route = 'abcdef';
      expect(directoryRoute.type).to.be.eq('none');
    });
  });
  describe('when a file is introduced', () => {
    const directoryRoute: CheckRoute = new CheckRoute('./package.json');
    it('type value is file', () => {
      expect(directoryRoute.type).to.be.eq('file');
    });
    it('on route value change to directory, type value is changed', () => {
      directoryRoute.route = './database';
      expect(directoryRoute.type).to.be.eq('directory');
    });
    it('on non existing route type is none', () => {
      directoryRoute.route = 'abcdef';
      expect(directoryRoute.type).to.be.eq('none');
    });
  });
});

describe('Testing existing path directory creator', () => {
  const createDir: NewDirectory = new NewDirectory('./database/Laura');
  it('Full path and new directory name can be read', () => {
    expect(createDir.directoryPath).to.be.eq('./database/Laura');
    expect(createDir.directoryName).to.be.eq('Laura');
  });
  it('Directory can be built', (done) => {
    createDir.build();
    expect(createDir.buildStatusMsg).to.be.eq('');
    done();
  });
  it('Directory can\'t be built twice, error message is launched', (done) => {
    createDir.build();
    done();
  });
  it('Directory can be destroyed', (done) => {
    createDir.destroy();
    expect(createDir.destroyStatusMsg).to.be.eq('');
    done();
  });
  it('Directory can\'t be destroyed twice, error message is launched', (done) => {
    createDir.destroy();
    done();
  });
});

describe('Testing non existing path directory creator', () => {
  const createDir: NewDirectory = new NewDirectory('./random/route');
  it('Full path and new directory name can be read', () => {
    expect(createDir.directoryPath).to.be.eq('./random/route');
    expect(createDir.directoryName).to.be.eq('route');
  });
  it('Directory can\'t be built, error message is launched', (done) => {
    createDir.build();
    done();
  });
});
