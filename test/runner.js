import jsdomGlobal from 'jsdom-global';
import chai from 'chai';
import sinonChai from 'sinon-chai';

// create a fake DOM
jsdomGlobal();

// extend chai with sinon
chai.use(sinonChai);
