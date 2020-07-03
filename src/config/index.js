import config from 'react-global-configuration';
import development from './config.development';
import production from './config.production';
import def from './config.defaul';

if (process.env.NODE_ENV === 'development') {
    config.set(development);
} else if (process.env.NODE_ENV === 'production') {
    config.set(production);
} else {
    config.set(def);
}
export default config;
