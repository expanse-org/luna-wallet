<template>
    <div class="loading">
        <div class="loadingMain">
            <img class="logo-luna" src="../../assets/img/logo-luna.png" alt="Logo"/>

            <!----------version page starts------------>
            <div  v-if="this.$store.state.screenState=='version'" class="version">
                <div class="content">
                    <div class="logo">
                        <h1>New Expanse Wallet version available</h1>
                        <div class="number">
                            <img src="../../assets/img/newversion.png">
                            <p>Version: <span>v0.10.0</span></p>
                        </div>
                        <h2>Download URL: <a href="">http://Github.com/expanse/mist/releases/tag/v0.10</a></h2>
                    </div>
                    <div class="download">
                        <button id="download-version">DOWNLOAD NEW VERSION</button>
                    </div>
                </div>
            </div>
            <!----------version page ends------------>

            <!----------configuration page starts------------>
            <div v-if="this.$store.state.screenState=='config'" class="configuration client-configuration">
                <div class="content">
                    <div class="logo">
                        <div class="gearAnimation">
                            <i class="firstGear"></i>
                            <i class="secondGear"></i>
                        </div>
                        <label class="ellipsiss">Loading client configuration</label>
                    </div>
                </div>
            </div>
            <!----------configuration page ends------------>

            <!----------cloudSync page starts------------>
            <div v-if="this.$store.state.screenState=='cloudSync'" class="cloudSync"> <!-- done -->
                <div class="content">
                    <div class="logo">
                        <div class="svgs">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 73">
                                <defs>
                                </defs>
                                <path id="Forma_1" data-name="Forma 1" class="cloud"
                                      d="M91.866,30.371q0.006-.278.006-0.549a29.821,29.821,0,0,0-59.545-2.414,23.45,23.45,0,1,0-8.879,45.155,2.649,2.649,0,0,0,0-5.3,18.153,18.153,0,1,1,10.06-33.258,2.649,2.649,0,0,0,4.112-2.393l-0.013-.189c-0.041-.563-0.08-1.094-0.08-1.6a24.524,24.524,0,1,1,48.854,2.94,2.648,2.648,0,0,0,2.871,2.951c0.566-.052,1.034-0.076,1.473-0.076a15.979,15.979,0,0,1,0,31.957,2.649,2.649,0,0,0,0,5.3A21.275,21.275,0,0,0,91.866,30.371Z"/>
                            </svg>
                            <img class="outer-wheel" src="../../assets/img/innerCricle.svg"/>
                        </div>
                        <label class="ellipsiss">Expanse node needs to sync. Please wait</label>
                        <label class="ellipsiss">Looking for peers</label>
                    </div>
                </div>
            </div>
            <!----------cloudSync page ends------------>

            <!----------nodeConnected page starts------------>
            <div v-if="this.$store.state.screenState=='nodeConnected'"  class="nodeConnected">  <!-- done -->
                <div class="content">
                    <div class="logo">
                        <div class="wifiAnimation">
                            <span class="dot"></span>
                            <div class="wifi-symbol left">
                                <div class="wifi-circle second"></div>
                                <div class="wifi-circle third"></div>
                                <div class="wifi-circle fourth"></div>
                            </div>
                            <div class="wifi-symbol right">
                                <div class="wifi-circle second"></div>
                                <div class="wifi-circle third"></div>
                                <div class="wifi-circle fourth"></div>
                            </div>
                        </div>
                        <label>Expanse node connected</label>
                    </div>
                </div>
            </div>
            <!----------nodeConnected page ends------------>

            <!----------nodeStart page starts------------>
            <div v-if="this.$store.state.screenState=='nodeStart'"  class="nodeStart"> <!-- node -->
                <div class="content">
                    <div class="logo">
                        <div class="rocketAnimation">
                            <svg class="rocket" xmlns="http://www.w3.org/2000/svg" width="66" height="94"
                                 viewBox="0 0 66 94">
                                <defs>
                                </defs>
                                <path id="Forma_1" data-name="Forma 1" class="rocket"
                                      d="M23.98,26.172a9.023,9.023,0,1,0,9.019-9A8.931,8.931,0,0,0,23.98,26.172Zm14.2,0a5.172,5.172,0,1,1-1.516-3.653A5.177,5.177,0,0,1,38.176,26.172ZM33.945,1.239a1.925,1.925,0,0,0-1.891,0A35.9,35.9,0,0,0,17.32,17.482a42.51,42.51,0,0,0-4.042,17.4v8.429L0.367,60.962A1.915,1.915,0,0,0,0,62.092v19.53a1.921,1.921,0,0,0,3.221,1.411L13.278,73.8v4.828A1.919,1.919,0,0,0,15.2,80.55h2.824L20.27,91.209a1.92,1.92,0,0,0,1.88,1.522h21.7a1.92,1.92,0,0,0,1.88-1.522l2.247-10.659H50.8a1.92,1.92,0,0,0,1.921-1.917V73.8l10.059,9.227A1.921,1.921,0,0,0,66,81.62V62.09a1.915,1.915,0,0,0-.369-1.13L52.719,43.308V34.88a42.513,42.513,0,0,0-4.041-17.4A35.9,35.9,0,0,0,33.945,1.239ZM42.287,88.9H23.708l-1.76-8.348h9.128V81.62a1.921,1.921,0,0,0,3.842,0V80.549h9.128Zm6.59-54.017V53.357a1.921,1.921,0,0,0,3.842,0V49.811l9.438,12.9V77.255L52.718,68.6V61.023a1.921,1.921,0,0,0-3.842,0V76.716H34.919V43.934a1.921,1.921,0,0,0-3.842,0V76.716H17.12V69.445s0-.009,0-0.013V61.024a1.921,1.921,0,0,0-3.842,0V68.6L3.839,77.256V62.716l9.438-12.9v3.546H17.12V43.966c0-.02,0-0.04,0-0.061V34.88c0-7.543,3.375-22.086,15.879-29.748C45.5,12.795,48.877,27.338,48.877,34.88Z"/>
                            </svg>
                            <svg class="smoke" xmlns="http://www.w3.org/2000/svg" width="24" height="20"
                                 viewBox="0 0 24 20">
                                <defs>
                                </defs>
                                <path class="thrust"
                                      d="M5.16,2.745a1.921,1.921,0,0,0-3.842,0V13.09a1.921,1.921,0,0,0,3.842,0V2.745Zm6.646-1.917A1.919,1.919,0,0,0,9.886,2.744V17.256a1.921,1.921,0,0,0,3.842,0V2.745A1.919,1.919,0,0,0,11.807.828ZM18.84,2.744V13.089a1.921,1.921,0,0,0,3.842,0V2.745A1.921,1.921,0,0,0,18.84,2.744Z"/>
                            </svg>
                        </div>
                        <label class="ellipsiss">Expanse node starting up</label>
                        <label class="ellipsiss">Checking network</label>
                    </div>
                </div>
            </div>
            <!----------nodeStart page ends------------>

            <!----------nodeUpToDate page starts------------>
            <div v-if="this.$store.state.screenState=='nodeUpToDate'"  class="nodeUpToDate"> <!-- done -->
                <div class="content">
                    <div class="logo">
                        <div class="svgs">
                            <svg class="round" xmlns="http://www.w3.org/2000/svg" width="99" height="99"
                                 viewBox="0 0 99 99">
                                <defs>
                                </defs>
                                <path class="nodeUpToDateRound"
                                      d="M81.288,19.833l4.241-4.241A49.3,49.3,0,0,1,98.963,48h-6A43.321,43.321,0,0,0,81.288,19.833ZM51,6.038v-6A49.3,49.3,0,0,1,83.407,13.472l-4.24,4.241A43.323,43.323,0,0,0,51,6.038ZM15.593,13.472A49.3,49.3,0,0,1,48,.038v6A43.322,43.322,0,0,0,19.834,17.712Zm2.119,6.362A43.32,43.32,0,0,0,6.037,48h-6A49.3,49.3,0,0,1,13.472,15.593Zm0,59.333-4.241,4.241A49.3,49.3,0,0,1,.037,51h6A43.32,43.32,0,0,0,17.712,79.167ZM48,92.962v6A49.3,49.3,0,0,1,15.593,85.528l4.241-4.241A43.322,43.322,0,0,0,48,92.962Zm35.407-7.434A49.3,49.3,0,0,1,51,98.962v-6A43.322,43.322,0,0,0,79.167,81.288ZM92.963,51h6A49.3,49.3,0,0,1,85.529,83.407l-4.241-4.241A43.321,43.321,0,0,0,92.963,51Z"/>
                            </svg>
                            <svg class="tick" xmlns="http://www.w3.org/2000/svg" width="55" height="42"
                                 viewBox="0 0 55 42">
                                <defs>
                                </defs>
                                <path class="nodeUpToDateTick"
                                      d="M54.375,5.144L49.959,0.614a2.043,2.043,0,0,0-2.938,0L20.555,27.764l-12.59-13a2.05,2.05,0,0,0-2.947,0L0.61,19.281a2.169,2.169,0,0,0,0,3.018l14,14.468,0.048,0.068,3.046,3.129,0.712,0.729h0l0.653,0.669a2.049,2.049,0,0,0,2.942,0l32.362-33.2A2.18,2.18,0,0,0,54.375,5.144Z"/>
                            </svg>
                        </div>
                        <label class="ellipsiss">Expanse node up-to-date</label>
                        <label class="ellipsiss">Checking network</label>
                    </div>
                </div>
            </div>
            <!----------nodeUpToDate page ends------------>

            <!----------downloadNode page starts------------>
            <div v-if="this.$store.state.screenState=='downloadNode'"  class="downloadNode">  <!-- done -->
                <div class="content">
                    <div class="logo">
                        <div class="svgs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="112" height="73" viewBox="0 0 112 73">
                                <defs>
                                </defs>
                                <path id="Forma_1" data-name="Forma 1" class="cloud"
                                      d="M91.866,30.371q0.006-.278.006-0.549a29.821,29.821,0,0,0-59.545-2.414,23.45,23.45,0,1,0-8.879,45.155,2.649,2.649,0,0,0,0-5.3,18.153,18.153,0,1,1,10.06-33.258,2.649,2.649,0,0,0,4.112-2.393l-0.013-.189c-0.041-.563-0.08-1.094-0.08-1.6a24.524,24.524,0,1,1,48.854,2.94,2.648,2.648,0,0,0,2.871,2.951c0.566-.052,1.034-0.076,1.473-0.076a15.979,15.979,0,0,1,0,31.957,2.649,2.649,0,0,0,0,5.3A21.275,21.275,0,0,0,91.866,30.371Z"/>
                            </svg>
                            <img class="outer-wheel" src="../../assets/img/downloadArrow.svg"/>
                        </div>
                        <label>Downloading new node</label>
                        <div class="bar-wrap"><span class="download-bar-fill" style="width: 0%;"></span></div>
                        <div class="down_load_info hide">
                            <div>Downloaded <label class="file_donwload_size"> 00</label> OF <label
                                    class="file_total_size">00</label></div>
                            <div>Timing Used <label class="file_donwload_time_elapsed"></label> Remaning Time<label
                                    class="file_donwload_time_remaining"></label></div>
                        </div>
                    </div>
                </div>
            </div>
            <!----------downloadNode page ends------------>

            <!----------downloading page starts------------>
            <div v-if="this.$store.state.screenState=='downloading'"  class="downloading downloading-peers"> <!-- done -->
                <div class="content">
                    <div class="logo">
                        <label>Downloading block <span class="c-block">0</span> of <span
                                class="t-block">0</span></label>
                        <div class="bar-wrap"><span class="bar-fill" style="width: 0%;"></span></div>
                        <div class="states">
                            <label>Downloading chain structure <span class="pulledStates">0</span> of <span
                                    class="knownStates">0</span></label>
                            <div class="bar-wrap"><span class="chain-bar-fill" style="width: 0%;"></span></div>
                        </div>
                    </div>
                </div>
            </div>
            <!----------downloading page ends------------>

            <!----------connectionError page starts------------>
            <div v-if="this.$store.state.screenState=='connectionError'"  class="connectionError node-network-error">  <!-- done -->
                <div class="content">
                    <div class="logo">

                        <div class="connectionErrorAnimation">
                            <svg class="bug" xmlns="http://www.w3.org/2000/svg" width="68" height="100"
                                 viewBox="0 0 68 100">
                                <defs>
                                </defs>
                                <path id="Forma_1_copy" data-name="Forma 1 copy" class="bug"
                                      d="M64.45,57h0.193a2.334,2.334,0,1,1,0,4.667h-7.07v14c0,0.348-.089.672-0.1,1.016l6.124,4.042a2.318,2.318,0,0,1,.654,3.236,2.372,2.372,0,0,1-3.268.647l-4.323-2.853A23.5,23.5,0,0,1,34.006,99c-0.018,0-.035,0-0.053,0s-0.035,0-.053,0a23.529,23.529,0,0,1-2.762-.181L31.1,98.814A23.454,23.454,0,0,1,11.314,81.755L7,84.608a2.36,2.36,0,0,1-3.259-.647A2.322,2.322,0,0,1,4.4,80.725L10.5,76.683c-0.015-.344-0.1-0.668-0.1-1.016v-14H3.35A2.333,2.333,0,1,1,3.35,57H10.4V41.916l-6-3.974a2.331,2.331,0,0,1,1.3-4.274,2.378,2.378,0,0,1,1.338.391l4.1,2.7a11.7,11.7,0,0,1,10.339-7.694L22.41,22.18A8.594,8.594,0,0,1,24.5,17.854V14.861a9.237,9.237,0,0,0-9.26-9.194,2.333,2.333,0,1,1,0-4.667l0.036,0,0.018,0a13.947,13.947,0,0,1,14,13.861v0.3A8.58,8.58,0,0,1,30.876,15h6.163a8.591,8.591,0,0,1,1.561.155V14.861A13.927,13.927,0,0,1,52.56,1c0.018,0,.035,0,0.054.005,0.036,0,.071-0.005.107-0.005a2.334,2.334,0,1,1,0,4.667,9.251,9.251,0,0,0-9.286,9.194v2.993a8.585,8.585,0,0,1,2.1,4.326l0.943,6.888A11.722,11.722,0,0,1,56.812,36.7L60.8,34.058a2.624,2.624,0,0,1,3.451.648,2.318,2.318,0,0,1-.654,3.236l-6.021,3.974V57H64.45ZM52.859,75.667v-8.22l-0.159.1V40.667a7.033,7.033,0,0,0-7.045-7H36.363V94.1a18.389,18.389,0,0,0,7.309-2.6c-0.05-.3-0.013-0.225.068,0.052A18.476,18.476,0,0,0,52.859,75.667ZM24.147,91.518c0.076-.254.108-0.314,0.06-0.024A19.3,19.3,0,0,0,27.7,93.182c0.06,0.021.119,0.046,0.18,0.066,0.321,0.114.651,0.2,0.978,0.292a18.951,18.951,0,0,0,2.693.558V33.667H22.218a7.043,7.043,0,0,0-7.065,7V67.55L15.1,67.516v8.151A18.485,18.485,0,0,0,24.147,91.518Zm6.826-71.851a3.843,3.843,0,0,0-3.818,3.142L26.307,29H41.578l-0.846-6.191a3.834,3.834,0,0,0-3.807-3.142H30.973Z"/>
                            </svg>
                            <svg class="bugError" xmlns="http://www.w3.org/2000/svg" width="54" height="54"
                                 viewBox="0 0 29 29">
                                <defs>
                                </defs>
                                <circle class="bugError_1" cx="14.5" cy="14.5" r="13.5"/>
                                <path id="Forma_1" data-name="Forma 1" class="bugError_2"
                                      d="M16.134,17.749L16.76,4.884H12.273L12.9,17.749h3.237Zm-1.617,1.419a2.454,2.454,0,0,0-2.557,2.584,2.456,2.456,0,0,0,2.5,2.586h0.057a2.445,2.445,0,0,0,2.525-2.586A2.444,2.444,0,0,0,14.516,19.168Z"/>
                            </svg>
                        </div>
                        <label>Expanse node connection error</label>
                        <label>Retrying Connection...</label>
                    </div>
                </div>
            </div>
            <!----------connectionError page ends------------>

             <!----------ChainError page starts------------>
             {{chainErrorData}}
            <div v-if="this.$store.state.screenState=='ChainError'"  class="connectionError node-network-error">  <!-- done -->
                <div class="content">
                    <div class="logo">

                        <div class="connectionErrorAnimation">
                            <svg class="bug" xmlns="http://www.w3.org/2000/svg" width="68" height="100"
                                 viewBox="0 0 68 100">
                                <defs>
                                </defs>
                                <path id="Forma_1_copy" data-name="Forma 1 copy" class="bug"
                                      d="M64.45,57h0.193a2.334,2.334,0,1,1,0,4.667h-7.07v14c0,0.348-.089.672-0.1,1.016l6.124,4.042a2.318,2.318,0,0,1,.654,3.236,2.372,2.372,0,0,1-3.268.647l-4.323-2.853A23.5,23.5,0,0,1,34.006,99c-0.018,0-.035,0-0.053,0s-0.035,0-.053,0a23.529,23.529,0,0,1-2.762-.181L31.1,98.814A23.454,23.454,0,0,1,11.314,81.755L7,84.608a2.36,2.36,0,0,1-3.259-.647A2.322,2.322,0,0,1,4.4,80.725L10.5,76.683c-0.015-.344-0.1-0.668-0.1-1.016v-14H3.35A2.333,2.333,0,1,1,3.35,57H10.4V41.916l-6-3.974a2.331,2.331,0,0,1,1.3-4.274,2.378,2.378,0,0,1,1.338.391l4.1,2.7a11.7,11.7,0,0,1,10.339-7.694L22.41,22.18A8.594,8.594,0,0,1,24.5,17.854V14.861a9.237,9.237,0,0,0-9.26-9.194,2.333,2.333,0,1,1,0-4.667l0.036,0,0.018,0a13.947,13.947,0,0,1,14,13.861v0.3A8.58,8.58,0,0,1,30.876,15h6.163a8.591,8.591,0,0,1,1.561.155V14.861A13.927,13.927,0,0,1,52.56,1c0.018,0,.035,0,0.054.005,0.036,0,.071-0.005.107-0.005a2.334,2.334,0,1,1,0,4.667,9.251,9.251,0,0,0-9.286,9.194v2.993a8.585,8.585,0,0,1,2.1,4.326l0.943,6.888A11.722,11.722,0,0,1,56.812,36.7L60.8,34.058a2.624,2.624,0,0,1,3.451.648,2.318,2.318,0,0,1-.654,3.236l-6.021,3.974V57H64.45ZM52.859,75.667v-8.22l-0.159.1V40.667a7.033,7.033,0,0,0-7.045-7H36.363V94.1a18.389,18.389,0,0,0,7.309-2.6c-0.05-.3-0.013-0.225.068,0.052A18.476,18.476,0,0,0,52.859,75.667ZM24.147,91.518c0.076-.254.108-0.314,0.06-0.024A19.3,19.3,0,0,0,27.7,93.182c0.06,0.021.119,0.046,0.18,0.066,0.321,0.114.651,0.2,0.978,0.292a18.951,18.951,0,0,0,2.693.558V33.667H22.218a7.043,7.043,0,0,0-7.065,7V67.55L15.1,67.516v8.151A18.485,18.485,0,0,0,24.147,91.518Zm6.826-71.851a3.843,3.843,0,0,0-3.818,3.142L26.307,29H41.578l-0.846-6.191a3.834,3.834,0,0,0-3.807-3.142H30.973Z"/>
                            </svg>
                            <svg class="bugError" xmlns="http://www.w3.org/2000/svg" width="54" height="54"
                                 viewBox="0 0 29 29">
                                <defs>
                                </defs>
                                <circle class="bugError_1" cx="14.5" cy="14.5" r="13.5"/>
                                <path id="Forma_1" data-name="Forma 1" class="bugError_2"
                                      d="M16.134,17.749L16.76,4.884H12.273L12.9,17.749h3.237Zm-1.617,1.419a2.454,2.454,0,0,0-2.557,2.584,2.456,2.456,0,0,0,2.5,2.586h0.057a2.445,2.445,0,0,0,2.525-2.586A2.444,2.444,0,0,0,14.516,19.168Z"/>
                            </svg>
                        </div>
                        <label>Expanse node broken chain error</label>
                        <label>Retrying to install again</label>
                    </div>
                </div>
            </div>
            <!----------ChainError page ends------------>

            <!----------error page starts------------>
            <div v-if="this.$store.state.screenState == 'error-downloading'"  class="error error-downloading-node"> <!-- done -->
                <div class="content">
                    <div class="logo">
                        <svg class="shake" xmlns="http://www.w3.org/2000/svg" width="99" height="99"
                             viewBox="0 0 99 99">
                            <defs >
                            </defs>
                            <path id="Forma_1" data-name="Forma 1" class="cls-1"
                                  d="M49.5,0.956A48.544,48.544,0,1,0,98.042,49.492,48.54,48.54,0,0,0,49.5.956Zm0,92.117A43.576,43.576,0,1,1,93.075,49.488,43.574,43.574,0,0,1,49.5,93.073ZM55.045,60.53l2.126-43.675H41.939L44.056,60.53H55.045Zm-5.49,4.818c-5.108,0-8.68,3.573-8.68,8.771,0,5.008,3.468,8.778,8.485,8.778h0.195c5.2,0,8.572-3.77,8.572-8.778C58.039,68.922,54.659,65.348,49.556,65.348Z"/>
                        </svg>

                        <label>Error running download binary</label>
                    </div>
                    <div class="retry-connection">
                        <button @click="callDownloadGexp" id="retry-connection">RETRY CONNECTION</button>
                    </div>
                </div>
            </div>
            <!----------error page ends------------>

            <div v-if="this.$store.state.screenState == 'downloading' || this.$store.state.screenState === 'cloudSync'"  class="launch">
                <button @click="launchApplication" id="launchApp" class="button--moema">LAUNCH LUNA</button>
            </div>
        </div>
    </div>
</template>

<script>
  import {web3} from '../../../main/libs/config';
  import {downloadGexp} from '../../../common/gexpfunc';
  import {chainErrorHandle} from '../../../common/loadingProgress';
  import {ipcRenderer, app} from 'electron';
  import appPath from 'path';
  var fs  = require('fs');
  import shell from "shelljs";
  import {getAllAcounts} from '../DasboardComponents/WalletDashboardComponents/walletcommon';

  export default {
    name: 'Splash-screen',
    data() {
       return {
           activeScreen: this.$store.state.screenState,
           networkSetting: true,
       };
    },
    created(){
        // this.$store.dispatch('addScreen', 'config')
        // console.log(this.$store)
        // this.activeScreen = this.$store.state.screenState;
        // console.log(this.activeScreen,"activeScreenAPP")
    },
    computed:
    {    
        chainErrorData() {
            ipcRenderer.on('chainrRepairError', (event, res) => {
                console.log(res, 'chainrRepairError------01');
                this.$store.dispatch('addScreen', 'ChainError');
                chainErrorHandle();
            });
        }
    },
    methods: {
        launchApplication(){
            let that = this;
            try{
                // web3 = startConnectWeb();
                // Sending Data to Main js For further Process
                // console.log(web3.eth.getAccounts());
                web3.eth.getAccounts().then((accounts, error) => {
                    if(accounts && accounts.length > 0){
                        // ipcRender
                        // er.send('launchApplication', 'Launch App');
                        that.$router.push({
                            path: '/walletdashboard'
                        });
                    }else{
                        // ipcRenderer.send('launchCreateAccount', 'Create Account');
                        that.$router.push({
                            path: '/createaccount'
                        })
                    }
                })
            }catch(e){
                // Raven.captureException(e);
                console.log(e, "Raven")
            }
        },
        callDownloadGexp(){
            try{
                setTimeout(function(){
                    downloadGexp();
                },1000);
            }catch(e){
                // Raven.captureException(e);
                console.log(e, "Raven")
            }
        }
    }
  }
</script>

<style>
.cls-1 {
    fill: #b63f37;
    width: 20px;
    fill-rule: evenodd;
}
.rocket {
    fill: #fff;
    fill-rule: evenodd;
}
.thrust {
    fill: #fff;
    fill-rule: evenodd;
}
.nodeUpToDateTick {
    fill: #fff;
    fill-rule: evenodd;
}
.nodeUpToDateRound {
    fill: #fff;
    fill-rule: evenodd;
}
.bug {
    fill: #fff;
    fill-rule: evenodd;
}
.bugError_1 {
    fill: #b63f37;
}

.bugError_2 {
    fill: #fff;
    fill-rule: evenodd;
}
/* network settings tab starts */
</style>
