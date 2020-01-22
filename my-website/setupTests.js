import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
require('jest-fetch-mock').enableMocks();

// Setup enzyme's react adapter
configure({ adapter: new EnzymeAdapter() });
