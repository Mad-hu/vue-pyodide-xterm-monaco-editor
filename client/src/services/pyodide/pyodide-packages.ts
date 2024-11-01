/**
 * https://pyodide.org/en/stable/usage/packages-in-pyodide.html
 * get the list of installed packages
 * 
const modulesList = []
document.querySelectorAll('tbody tr').forEach((value) => {
  const name = value.firstChild.innerText
  const version = value.lastElementChild.innerText
  modulesList.push({ name: name, version: version })
})
JSON.stringify(modulesList)
 */

export const modules = [
  { name: 'aiohttp', version: '3.9.5' },
  { name: 'aiosignal', version: '1.3.1' },
  { name: 'altair', version: '5.3.0' },
  { name: 'annotated-types', version: '0.6.0' },
  { name: 'asciitree', version: '0.3.3' },
  { name: 'astropy', version: '6.0.1' },
  { name: 'astropy_iers_data', version: '0.2024.4.22.0.29.50' },
  { name: 'asttokens', version: '2.4.1' },
  { name: 'async-timeout', version: '4.0.3' },
  { name: 'atomicwrites', version: '1.4.1' },
  { name: 'attrs', version: '23.2.0' },
  { name: 'autograd', version: '1.6.2' },
  { name: 'awkward-cpp', version: '33' },
  { name: 'b2d', version: '0.7.4' },
  { name: 'bcrypt', version: '4.1.2' },
  { name: 'beautifulsoup4', version: '4.12.3' },
  { name: 'biopython', version: '1.83' },
  { name: 'bitarray', version: '2.9.2' },
  { name: 'bitstring', version: '4.1.4' },
  { name: 'bleach', version: '6.1.0' },
  { name: 'bokeh', version: '3.4.1' },
  { name: 'boost-histogram', version: '1.4.1' },
  { name: 'brotli', version: '1.1.0' },
  { name: 'cachetools', version: '5.3.3' },
  { name: 'Cartopy', version: '0.23.0' },
  { name: 'cbor-diag', version: '1.0.1' },
  { name: 'certifi', version: '2024.2.2' },
  { name: 'cffi', version: '1.16.0' },
  { name: 'cffi_example', version: '0.1' },
  { name: 'cftime', version: '1.6.3' },
  { name: 'charset-normalizer', version: '3.3.2' },
  { name: 'clarabel', version: '0.7.1' },
  { name: 'click', version: '8.1.7' },
  { name: 'cligj', version: '0.7.2' },
  { name: 'cloudpickle', version: '3.0.0' },
  { name: 'cmyt', version: '2.0.0' },
  { name: 'colorspacious', version: '1.1.2' },
  { name: 'contourpy', version: '1.2.1' },
  { name: 'coolprop', version: '6.6.0' },
  { name: 'coverage', version: '7.4.4' },
  { name: 'cramjam', version: '2.8.3' },
  { name: 'crc32c', version: '2.4' },
  { name: 'cryptography', version: '42.0.5' },
  { name: 'cssselect', version: '1.2.0' },
  { name: 'cvxpy-base', version: '1.5.1' },
  { name: 'cycler', version: '0.12.1' },
  { name: 'cysignals', version: '1.11.4' },
  { name: 'cytoolz', version: '0.12.3' },
  { name: 'decorator', version: '5.1.1' },
  { name: 'demes', version: '0.2.3' },
  { name: 'deprecation', version: '2.1.0' },
  { name: 'distlib', version: '0.3.8' },
  { name: 'docutils', version: '0.21.1' },
  { name: 'duckdb', version: '1.0.0' },
  { name: 'ewah_bool_utils', version: '1.2.0' },
  { name: 'exceptiongroup', version: '1.2.1' },
  { name: 'executing', version: '2.0.1' },
  { name: 'fastparquet', version: '2024.2.0' },
  { name: 'fiona', version: '1.9.5' },
  { name: 'fonttools', version: '4.51.0' },
  { name: 'freesasa', version: '2.2.1' },
  { name: 'frozenlist', version: '1.4.1' },
  { name: 'fsspec', version: '2024.3.1' },
  { name: 'future', version: '1.0.0' },
  { name: 'galpy', version: '1.9.2' },
  { name: 'gensim', version: '4.3.2' },
  { name: 'geopandas', version: '0.14.3' },
  { name: 'gmpy2', version: '2.1.5' },
  { name: 'gsw', version: '3.6.17' },
  { name: 'h5py', version: '3.11.0' },
  { name: 'html5lib', version: '1.1' },
  { name: 'idna', version: '3.7' },
  { name: 'igraph', version: '0.11.4' },
  { name: 'imageio', version: '2.34.1' },
  { name: 'iniconfig', version: '2.0.0' },
  { name: 'ipython', version: '8.23.0' },
  { name: 'jedi', version: '0.19.1' },
  { name: 'Jinja2', version: '3.1.3' },
  { name: 'joblib', version: '1.4.0' },
  { name: 'jsonschema', version: '4.21.1' },
  { name: 'jsonschema_specifications', version: '2023.12.1' },
  { name: 'kiwisolver', version: '1.4.5' },
  { name: 'lakers-python', version: '0.3.0' },
  { name: 'lazy-object-proxy', version: '1.10.0' },
  { name: 'lazy_loader', version: '0.4' },
  { name: 'libcst', version: '1.3.1' },
  { name: 'lightgbm', version: '4.3.0' },
  { name: 'logbook', version: '1.7.0.post0' },
  { name: 'lxml', version: '5.2.1' },
  { name: 'MarkupSafe', version: '2.1.5' },
  { name: 'matplotlib', version: '3.5.2' },
  { name: 'matplotlib-inline', version: '0.1.7' },
  { name: 'matplotlib-pyodide', version: '0.2.2' },
  { name: 'memory-allocator', version: '0.1.4' },
  { name: 'micropip', version: '0.6.0' },
  { name: 'mmh3', version: '4.1.0' },
  { name: 'mne', version: '1.7.0' },
  { name: 'more-itertools', version: '10.2.0' },
  { name: 'mpmath', version: '1.3.0' },
  { name: 'msgpack', version: '1.0.8' },
  { name: 'msgspec', version: '0.18.6' },
  { name: 'msprime', version: '1.3.1' },
  { name: 'multidict', version: '6.0.5' },
  { name: 'munch', version: '4.0.0' },
  { name: 'mypy', version: '1.9.0' },
  { name: 'netcdf4', version: '1.6.5' },
  { name: 'networkx', version: '3.3' },
  { name: 'newick', version: '1.9.0' },
  { name: 'nh3', version: '0.2.17' },
  { name: 'nlopt', version: '2.7.0' },
  { name: 'nltk', version: '3.8.1' },
  { name: 'numcodecs', version: '0.11.0' },
  { name: 'numpy', version: '1.26.4' },
  { name: 'opencv-python', version: '4.9.0.80' },
  { name: 'optlang', version: '1.8.1' },
  { name: 'orjson', version: '3.10.1' },
  { name: 'packaging', version: '23.2' },
  { name: 'pandas', version: '2.2.0' },
  { name: 'parso', version: '0.8.4' },
  { name: 'patsy', version: '0.5.6' },
  { name: 'peewee', version: '3.17.3' },
  { name: 'Pillow', version: '10.2.0' },
  { name: 'pillow_heif', version: '0.8.0' },
  { name: 'pkgconfig', version: '1.5.5' },
  { name: 'pluggy', version: '1.5.0' },
  { name: 'pplpy', version: '0.8.10' },
  { name: 'primecountpy', version: '0.1.0' },
  { name: 'prompt_toolkit', version: '3.0.43' },
  { name: 'protobuf', version: '4.24.4' },
  { name: 'pure_eval', version: '0.2.2' },
  { name: 'py', version: '1.11.0' },
  { name: 'pyclipper', version: '1.3.0.post5' },
  { name: 'pycparser', version: '2.22' },
  { name: 'pycryptodome', version: '3.20.0' },
  { name: 'pydantic', version: '2.7.0' },
  { name: 'pydantic_core', version: '2.18.1' },
  { name: 'pyerfa', version: '2.0.1.4' },
  { name: 'pygame-ce', version: '2.4.1' },
  { name: 'Pygments', version: '2.17.2' },
  { name: 'pyheif', version: '0.7.1' },
  { name: 'pyiceberg', version: '0.6.0' },
  { name: 'pyinstrument', version: '4.4.0' },
  { name: 'pynacl', version: '1.5.0' },
  { name: 'pyodide-http', version: '0.2.1' },
  { name: 'pyparsing', version: '3.1.2' },
  { name: 'pyproj', version: '3.6.1' },
  { name: 'pyrsistent', version: '0.20.0' },
  { name: 'pysam', version: '0.22.0' },
  { name: 'pyshp', version: '2.3.1' },
  { name: 'pytest', version: '8.1.1' },
  { name: 'pytest-asyncio', version: '0.23.7' },
  { name: 'pytest-benchmark', version: '4.0.0' },
  { name: 'python-dateutil', version: '2.9.0.post0' },
  { name: 'python-flint', version: '0.6.0' },
  { name: 'python-magic', version: '0.4.27' },
  { name: 'python-sat', version: '1.8.dev13' },
  { name: 'python_solvespace', version: '3.0.8' },
  { name: 'pytz', version: '2024.1' },
  { name: 'pywavelets', version: '1.6.0' },
  { name: 'pyxel', version: '1.9.10' },
  { name: 'pyxirr', version: '0.10.3' },
  { name: 'pyyaml', version: '6.0.1' },
  { name: 'rebound', version: '3.24.2' },
  { name: 'reboundx', version: '3.10.1' },
  { name: 'referencing', version: '0.34.0' },
  { name: 'regex', version: '2024.4.16' },
  { name: 'requests', version: '2.31.0' },
  { name: 'retrying', version: '1.3.4' },
  { name: 'rich', version: '13.7.1' },
  { name: 'river', version: '0.19.0' },
  { name: 'RobotRaconteur', version: '1.2.0' },
  { name: 'rpds-py', version: '0.18.0' },
  { name: 'ruamel.yaml', version: '0.18.6' },
  { name: 'rust-panic-test', version: '1.0' },
  { name: 'scikit-image', version: '0.23.2' },
  { name: 'scikit-learn', version: '1.4.2' },
  { name: 'scipy', version: '1.12.0' },
  { name: 'screed', version: '1.1.3' },
  { name: 'setuptools', version: '69.5.1' },
  { name: 'shapely', version: '2.0.2' },
  { name: 'simplejson', version: '3.19.2' },
  { name: 'sisl', version: '0.14.3' },
  { name: 'six', version: '1.16.0' },
  { name: 'smart_open', version: '7.0.4' },
  { name: 'sortedcontainers', version: '2.4.0' },
  { name: 'soupsieve', version: '2.5' },
  { name: 'sourmash', version: '4.8.8' },
  { name: 'sparseqr', version: '1.2' },
  { name: 'sqlalchemy', version: '2.0.29' },
  { name: 'stack_data', version: '0.6.3' },
  { name: 'statsmodels', version: '0.14.2' },
  { name: 'strictyaml', version: '1.7.3' },
  { name: 'svgwrite', version: '1.4.3' },
  { name: 'swiglpk', version: '5.0.10' },
  { name: 'sympy', version: '1.12' },
  { name: 'tblib', version: '3.0.0' },
  { name: 'termcolor', version: '2.4.0' },
  { name: 'texttable', version: '1.7.0' },
  { name: 'threadpoolctl', version: '3.4.0' },
  { name: 'tomli', version: '2.0.1' },
  { name: 'tomli-w', version: '1.0.0' },
  { name: 'toolz', version: '0.12.1' },
  { name: 'tqdm', version: '4.66.2' },
  { name: 'traitlets', version: '5.14.3' },
  { name: 'traits', version: '6.4.3' },
  { name: 'tskit', version: '0.5.6' },
  { name: 'typing-extensions', version: '4.11.0' },
  { name: 'tzdata', version: '2024.1' },
  { name: 'uncertainties', version: '3.1.7' },
  { name: 'unyt', version: '3.0.2' },
  { name: 'urllib3', version: '2.2.1' },
  { name: 'wcwidth', version: '0.2.13' },
  { name: 'webencodings', version: '0.5.1' },
  { name: 'wordcloud', version: '1.9.3' },
  { name: 'wrapt', version: '1.16.0' },
  { name: 'xarray', version: '2024.3.0' },
  { name: 'xgboost', version: '2.1.0.dev0' },
  { name: 'xlrd', version: '2.0.1' },
  { name: 'xxhash', version: '3.4.1' },
  { name: 'xyzservices', version: '2024.4.0' },
  { name: 'yarl', version: '1.9.4' },
  { name: 'yt', version: '4.3.0' },
  { name: 'zarr', version: '2.16.1' },
  { name: 'zengl', version: '2.4.1' },
  { name: 'zstandard', version: '0.22.0' }
]
