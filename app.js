// ==========================================
// AdTech Quiz Application with Accessibility Features
// Voice, Hand Gestures, Eye Blink Controls
// ==========================================

class AdTechQuiz {
  constructor() {
    // State
    this.state = {
      userName: '',
      selectedTopics: [],
      currentTopicIndex: 0,
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      currentAnswer: null,
      isAnswered: false
    };

    // Accessibility features
    this.features = {
      voice: false,
      gesture: false,
      blink: false
    };

    // Voice recognition
    this.recognition = null;
    this.synthesis = window.speechSynthesis;

    // MediaPipe for gestures and blinks
    this.hands = null;
    this.faceMesh = null;
    this.camera = null;
    this.videoElement = null;
    this.canvasElement = null;

    // Gesture state
    this.lastGestureTime = 0;
    this.gestureCooldown = 800; // ms

    // Blink state
    this.blinkState = {
      lastBlinkTime: 0,
      blinkCount: 0,
      blinkWindow: 500, // ms for double blink
      longBlinkStart: 0,
      longBlinkThreshold: 2000, // ms for long blink
      isBlinking: false,
      currentOption: 0,
      earThreshold: 0.25
    };

    this.init();
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.renderTopics();
    this.setupKeyboardShortcuts();
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => this.handleVoiceCommand(event);
      this.recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
    }
  }

  cacheElements() {
    // Screens
    this.welcomeScreen = document.getElementById('welcomeScreen');
    this.quizScreen = document.getElementById('quizScreen');
    this.resultsScreen = document.getElementById('resultsScreen');

    // Welcome elements
    this.userNameInput = document.getElementById('userName');
    this.topicsGrid = document.getElementById('topicsGrid');
    this.startBtn = document.getElementById('startBtn');

    // Quiz elements
    this.currentTopicEl = document.getElementById('currentTopic');
    this.progressFill = document.getElementById('progressFill');
    this.questionCounter = document.getElementById('questionCounter');
    this.scoreValue = document.getElementById('scoreValue');
    this.questionText = document.getElementById('questionText');
    this.optionsGrid = document.getElementById('optionsGrid');
    this.explanation = document.getElementById('explanation');
    this.explanationText = document.getElementById('explanationText');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    // Results elements
    this.finalScore = document.getElementById('finalScore');
    this.totalQuestions = document.getElementById('totalQuestions');
    this.performanceMessage = document.getElementById('performanceMessage');
    this.retakeBtn = document.getElementById('retakeBtn');
    this.newTopicBtn = document.getElementById('newTopicBtn');

    // Controls
    this.controlsToggle = document.getElementById('controlsToggle');
    this.controlsContent = document.getElementById('controlsContent');
    this.voiceToggle = document.getElementById('voiceToggle');
    this.gestureToggle = document.getElementById('gestureToggle');
    this.blinkToggle = document.getElementById('blinkToggle');
    this.helpBtn = document.getElementById('helpBtn');

    // Modal
    this.helpModal = document.getElementById('helpModal');
    this.modalClose = document.getElementById('modalClose');

    // Camera
    this.cameraPreview = document.getElementById('cameraPreview');
    this.videoElement = document.getElementById('videoElement');
    this.canvasElement = document.getElementById('canvasElement');
    this.gestureFeedback = document.getElementById('gestureFeedback');

    // Status
    this.statusMessage = document.getElementById('statusMessage');
  }

  attachEventListeners() {
    // Welcome screen
    this.startBtn.addEventListener('click', () => this.startQuiz());
    this.userNameInput.addEventListener('input', () => this.validateStart());

    // Quiz navigation
    this.prevBtn.addEventListener('click', () => this.previousQuestion());
    this.nextBtn.addEventListener('click', () => this.nextQuestion());

    // Results
    this.retakeBtn.addEventListener('click', () => this.retakeQuiz());
    this.newTopicBtn.addEventListener('click', () => this.chooseNewTopic());

    // Controls
    this.controlsToggle.addEventListener('click', () => this.toggleControls());
    this.voiceToggle.addEventListener('change', (e) => this.toggleVoice(e.target.checked));
this.gestureToggle.addEventListener('change', (e) => this.toggleGesture(e.target.checked));
    this.blinkToggle.addEventListener('change', (e) => this.toggleBlink(e.target.checked));

    // Help
    this.helpBtn.addEventListener('click', () => this.showHelp());
    this.modalClose.addEventListener('click', () => this.closeHelp());
    this.helpModal.addEventListener('click', (e) => {
      if (e.target === this.helpModal) this.closeHelp();
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (this.helpModal.classList.contains('active')) return;

      const currentScreen = this.getCurrentScreen();
      
      if (currentScreen === 'quiz') {
        // Number keys 1-4 for options
        if (e.key >= '1' && e.key <= '4') {
          const index = parseInt(e.key) - 1;
          this.selectOption(index);
        }
        // Enter for next
        if (e.key === 'Enter' && !this.nextBtn.disabled) {
          this.nextQuestion();
        }
        // Backspace for previous
        if (e.key === 'Backspace' && !this.prevBtn.disabled) {
          e.preventDefault();
          this.previousQuestion();
        }
      }
    });
  }

  // ==========================================
  // SCREEN MANAGEMENT
  // ==========================================

  showScreen(screen) {
    [this.welcomeScreen, this.quizScreen, this.resultsScreen].forEach(s => {
      s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
  }

  getCurrentScreen() {
    if (!this.welcomeScreen.classList.contains('hidden')) return 'welcome';
    if (!this.quizScreen.classList.contains('hidden')) return 'quiz';
    if (!this.resultsScreen.classList.contains('hidden')) return 'results';
    return null;
  }

  // ==========================================
  // TOPIC SELECTION
  // ==========================================

  renderTopics() {
    this.topicsGrid.innerHTML = '';
    
    quizData.topics.forEach((topic, index) => {
      const card = document.createElement('div');
      card.className = 'topic-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `${topic.name} - ${topic.description}`);
      
      card.innerHTML = `
        <span class="topic-icon" aria-hidden="true">${topic.icon}</span>
        <span class="topic-name">${topic.name}</span>
      `;

      card.addEventListener('click', () => this.toggleTopic(index, card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleTopic(index, card);
        }
      });

      this.topicsGrid.appendChild(card);
    });
  }

  toggleTopic(index, card) {
    const topicIndex = this.state.selectedTopics.indexOf(index);
    
    if (topicIndex > -1) {
      this.state.selectedTopics.splice(topicIndex, 1);
      card.classList.remove('selected');
    } else {
      this.state.selectedTopics.push(index);
      card.classList.add('selected');
    }

    this.validateStart();
  }

  validateStart() {
    const hasName = this.userNameInput.value.trim().length > 0;
    const hasTopics = this.state.selectedTopics.length > 0;
    this.startBtn.disabled = !(hasName && hasTopics);
  }

  // ==========================================
  // QUIZ FLOW
  // ==========================================

  startQuiz() {
    this.state.userName = this.userNameInput.value.trim();
    this.state.currentTopicIndex = 0;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.answers = [];

    this.showScreen(this.quizScreen);
    this.loadQuestion();
    this.speak(`Welcome ${this.state.userName}! Let's begin the quiz.`);
  }

  loadQuestion() {
    const topic = quizData.topics[this.state.selectedTopics[this.state.currentTopicIndex]];
    const question = topic.questions[this.state.currentQuestionIndex];

    this.state.currentAnswer = null;
    this.state.isAnswered = false;

    // Reset blink option cycle
    this.blinkState.currentOption = 0;

    // Update UI
    this.currentTopicEl.textContent = topic.name;
    this.questionText.textContent = question.question;
    this.questionCounter.textContent = `Question ${this.state.currentQuestionIndex + 1} of ${topic.questions.length}`;
    
    // Update progress
    const totalQuestions = this.state.selectedTopics.reduce((sum, topicIdx) => {
      return sum + quizData.topics[topicIdx].questions.length;
    }, 0);
    const answeredQuestions = this.state.answers.length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    this.progressFill.style.width = `${progress}%`;

    // Render options
    this.renderOptions(question);

    // Hide explanation
    this.explanation.classList.add('hidden');

    // Update navigation
    this.updateNavigation();

    // Read question if voice is enabled
    if (this.features.voice) {
      setTimeout(() => {
        this.speak(question.question);
      }, 500);
    }
  }

  renderOptions(question) {
    this.optionsGrid.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D'];

    question.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('data-index', index);
      
      btn.innerHTML = `
        <span class="option-label">${labels[index]}</span>
        <span class="option-text">${option}</span>
      `;

      btn.addEventListener('click', () => this.selectOption(index));

      this.optionsGrid.appendChild(btn);
    });
  }

  selectOption(index) {
    if (this.state.isAnswered) return;

    const topic = quizData.topics[this.state.selectedTopics[this.state.currentTopicIndex]];
    const question = topic.questions[this.state.currentQuestionIndex];
    const buttons = this.optionsGrid.querySelectorAll('.option-btn');

    // Update state
    this.state.currentAnswer = index;
    this.state.isAnswered = true;

    // Update UI
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      btn.setAttribute('aria-checked', i === index ? 'true' : 'false');
      
      if (i === index) {
        btn.classList.add('selected');
      }

      if (i === question.correct) {
        btn.classList.add('correct');
      } else if (i === index && i !== question.correct) {
        btn.classList.add('incorrect');
      }
    });

    // Check answer
    const isCorrect = index === question.correct;
    if (isCorrect) {
      this.state.score++;
      this.scoreValue.textContent = this.state.score;
      this.speak('Correct!');
      this.showStatus('✓ Correct!', 'success');
    } else {
      this.speak('Incorrect. ' + question.explanation);
      this.showStatus('✗ Incorrect', 'error');
    }

    // Show explanation
    this.explanationText.textContent = question.explanation;
    this.explanation.classList.remove('hidden');

    // Save answer
    this.state.answers.push({
      topicIndex: this.state.selectedTopics[this.state.currentTopicIndex],
      questionIndex: this.state.currentQuestionIndex,
      selectedAnswer: index,
      correctAnswer: question.correct,
      isCorrect: isCorrect
    });

    // Update navigation
    this.updateNavigation();
  }

  updateNavigation() {
    // Previous button
    this.prevBtn.disabled = this.state.currentQuestionIndex === 0 && this.state.currentTopicIndex === 0;

    // Next button
    this.nextBtn.disabled = !this.state.isAnswered;
  }

  previousQuestion() {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
    } else if (this.state.currentTopicIndex > 0) {
      this.state.currentTopicIndex--;
      const topic = quizData.topics[this.state.selectedTopics[this.state.currentTopicIndex]];
      this.state.currentQuestionIndex = topic.questions.length - 1;
    } else {
      return;
    }

    this.loadQuestion();
  }

  nextQuestion() {
    if (!this.state.isAnswered) return;

    const topic = quizData.topics[this.state.selectedTopics[this.state.currentTopicIndex]];
    
    if (this.state.currentQuestionIndex < topic.questions.length - 1) {
      this.state.currentQuestionIndex++;
      this.loadQuestion();
    } else if (this.state.currentTopicIndex < this.state.selectedTopics.length - 1) {
      this.state.currentTopicIndex++;
      this.state.currentQuestionIndex = 0;
      this.loadQuestion();
    } else {
      this.showResults();
    }
  }

  // ==========================================
  // RESULTS
  // ==========================================

  showResults() {
    const totalQuestions = this.state.answers.length;
    const percentage = (this.state.score / totalQuestions) * 100;

    this.finalScore.textContent = this.state.score;
    this.totalQuestions.textContent = totalQuestions;

    let message = '';
    if (percentage >= 90) {
      message = '🌟 Outstanding! You\'re an AdTech expert!';
    } else if (percentage >= 70) {
      message = '👏 Great job! You have solid knowledge!';
    } else if (percentage >= 50) {
      message = '👍 Good effort! Keep learning!';
    } else {
      message = '📚 Keep practicing! You\'ll improve!';
    }

    this.performanceMessage.textContent = message;
    this.showScreen(this.resultsScreen);
    this.speak(`Quiz complete! You scored ${this.state.score} out of ${totalQuestions}. ${message}`);
  }

  retakeQuiz() {
    this.state.currentTopicIndex = 0;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.answers = [];
    this.scoreValue.textContent = '0';

    this.showScreen(this.quizScreen);
    this.loadQuestion();
  }

  chooseNewTopic() {
    this.state.selectedTopics = [];
    this.state.currentTopicIndex = 0;
    this.state.currentQuestionIndex = 0;
    this.state.score = 0;
    this.state.answers = [];
    this.scoreValue.textContent = '0';

    // Reset topic selection
    const cards = this.topicsGrid.querySelectorAll('.topic-card');
    cards.forEach(card => card.classList.remove('selected'));

    this.showScreen(this.welcomeScreen);
    this.validateStart();
  }

  // ==========================================
  // VOICE CONTROL
  // ==========================================

  toggleVoice(enabled) {
    this.features.voice = enabled;

    if (enabled) {
      if (this.recognition) {
        try {
          this.recognition.start();
          this.showStatus('🎤 Voice control enabled', 'info');
        } catch (error) {
          console.error('Failed to start voice recognition:', error);
        }
      } else {
        this.showStatus('❌ Voice recognition not supported', 'error');
        this.voiceToggle.checked = false;
        this.features.voice = false;
      }
    } else {
      if (this.recognition) {
        this.recognition.stop();
      }
      this.showStatus('🎤 Voice control disabled', 'info');
    }
  }

  handleVoiceCommand(event) {
    const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
    console.log('Voice command:', transcript);

    const currentScreen = this.getCurrentScreen();

    if (currentScreen === 'quiz') {
      // Option selection
      if (transcript.includes('option')) {
        const match = transcript.match(/option\s*(one|two|three|four|1|2|3|4|a|b|c|d)/i);
        if (match) {
          const option = match[1];
          let index = -1;
          
          if (option === 'one' || option === '1' || option === 'a') index = 0;
          else if (option === 'two' || option === '2' || option === 'b') index = 1;
          else if (option === 'three' || option === '3' || option === 'c') index = 2;
          else if (option === 'four' || option === '4' || option === 'd') index = 3;

          if (index >= 0 && index < 4) {
            this.selectOption(index);
          }
        }
      }
      // Navigation
      else if (transcript.includes('next')) {
        if (!this.nextBtn.disabled) this.nextQuestion();
      }
      else if (transcript.includes('previous') || transcript.includes('back')) {
        if (!this.prevBtn.disabled) this.previousQuestion();
      }
      // Read question
      else if (transcript.includes('read question') || transcript.includes('repeat')) {
        const topic = quizData.topics[this.state.selectedTopics[this.state.currentTopicIndex]];
        const question = topic.questions[this.state.currentQuestionIndex];
        this.speak(question.question);
      }
    }
    else if (currentScreen === 'welcome') {
      if (transcript.includes('start')) {
        if (!this.startBtn.disabled) this.startQuiz();
      }
    }
    else if (currentScreen === 'results') {
      if (transcript.includes('retake') || transcript.includes('again')) {
        this.retakeQuiz();
      }
      else if (transcript.includes('new topic') || transcript.includes('choose')) {
        this.chooseNewTopic();
      }
    }
  }

  speak(text) {
    if (!this.features.voice || !this.synthesis) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    this.synthesis.speak(utterance);
  }

  // ==========================================
  // HAND GESTURE CONTROL
  // ==========================================

  async toggleGesture(enabled) {
    if (enabled) {
      // Stop blink mode if active
      if (this.features.blink) {
        this.blinkToggle.checked = false;
        this.features.blink = false;
      }
      // Stop any existing camera
      this.stopCamera();
      
      this.features.gesture = enabled;
      await this.initializeCamera('gesture');
      this.showStatus('✋ Hand gesture control enabled', 'info');
    } else {
      this.features.gesture = false;
      this.stopCamera();
      this.showStatus('✋ Hand gesture control disabled', 'info');
    }
  }

  async initializeCamera(mode) {
    try {
      console.log(`Initializing camera for ${mode} mode...`);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      this.videoElement.srcObject = stream;
      this.cameraPreview.style.display = 'block';
      
      // Wait for video to be ready
      await new Promise((resolve) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play();
          resolve();
        };
      });

      if (mode === 'gesture' && typeof Hands !== 'undefined') {
        this.hands = new Hands({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        this.hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.5
        });

        this.hands.onResults((results) => this.handleGestureResults(results));

        const camera = new Camera(this.videoElement, {
          onFrame: async () => {
            await this.hands.send({ image: this.videoElement });
          },
          width: 640,
          height: 480
        });

        camera.start();
        this.camera = camera;
      }
      else if (mode === 'blink' && typeof FaceMesh !== 'undefined') {
        console.log('Initializing FaceMesh for blink detection...');
        
        this.faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        this.faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        this.faceMesh.onResults((results) => this.handleBlinkResults(results));

        const camera = new Camera(this.videoElement, {
          onFrame: async () => {
            if (this.features.blink && this.faceMesh) {
              await this.faceMesh.send({ image: this.videoElement });
            }
          },
          width: 640,
          height: 480
        });

        camera.start();
        this.camera = camera;
        console.log('FaceMesh initialized successfully');
      }
      else if (mode === 'blink' && typeof FaceMesh === 'undefined') {
        throw new Error('FaceMesh library not loaded. Please check your internet connection.');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      this.showStatus('❌ Camera access denied', 'error');
      
      if (mode === 'gesture') {
        this.gestureToggle.checked = false;
        this.features.gesture = false;
      } else {
        this.blinkToggle.checked = false;
        this.features.blink = false;
      }
    }
  }

  handleGestureResults(results) {
    if (!this.features.gesture || !results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      this.gestureFeedback.textContent = '';
      return;
    }

    const now = Date.now();
    if (now - this.lastGestureTime < this.gestureCooldown) return;

    const landmarks = results.multiHandLandmarks[0];
    const fingerCount = this.countFingers(landmarks);

    // Display feedback
    if (fingerCount > 0 && fingerCount <= 4) {
      this.gestureFeedback.textContent = `${fingerCount} finger${fingerCount > 1 ? 's' : ''}`;
    } else if (fingerCount === 5) {
      this.gestureFeedback.textContent = 'Open palm';
    } else {
      this.gestureFeedback.textContent = '';
    }

    const currentScreen = this.getCurrentScreen();

    if (currentScreen === 'quiz') {
      // Finger count for options (1-4)
      if (fingerCount >= 1 && fingerCount <= 4) {
        this.selectOption(fingerCount - 1);
        this.lastGestureTime = now;
      }
      // Open palm for next
      else if (fingerCount === 5 && !this.nextBtn.disabled) {
        this.nextQuestion();
        this.lastGestureTime = now;
      }
    }
  }

  countFingers(landmarks) {
    // Finger tip indices: thumb=4, index=8, middle=12, ring=16, pinky=20
    // Finger base indices: thumb=3, index=6, middle=10, ring=14, pinky=18
    
    const fingerTips = [4, 8, 12, 16, 20];
    const fingerBases = [3, 6, 10, 14, 18];
    let count = 0;

    // Thumb (compare x-coordinate)
    if (landmarks[fingerTips[0]].x < landmarks[fingerBases[0]].x) {
      count++;
    }

    // Other fingers (compare y-coordinate)
    for (let i = 1; i < 5; i++) {
      if (landmarks[fingerTips[i]].y < landmarks[fingerBases[i]].y) {
        count++;
      }
    }

    return count;
  }

  // ==========================================
  // EYE BLINK CONTROL
  // ==========================================

  async toggleBlink(enabled) {
    if (enabled) {
      // Stop gesture mode if active
      if (this.features.gesture) {
        this.gestureToggle.checked = false;
        this.features.gesture = false;
      }
      // Stop any existing camera
      this.stopCamera();
      
      this.features.blink = enabled;
      await this.initializeCamera('blink');
      this.showStatus('👁️ Eye blink control enabled', 'info');
    } else {
      this.features.blink = false;
      this.stopCamera();
      this.showStatus('👁️ Eye blink control disabled', 'info');
    }
  }

  handleBlinkResults(results) {
    if (!this.features.blink || !results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
      this.gestureFeedback.textContent = '';
      return;
    }

    const landmarks = results.multiFaceLandmarks[0];
    const leftEAR = this.calculateEAR(landmarks, 'left');
    const rightEAR = this.calculateEAR(landmarks, 'right');
    const avgEAR = (leftEAR + rightEAR) / 2;

    const now = Date.now();
    const currentScreen = this.getCurrentScreen();

    if (currentScreen !== 'quiz') return;

    // Detect blink
    if (avgEAR < this.blinkState.earThreshold) {
      if (!this.blinkState.isBlinking) {
        // Blink started
        this.blinkState.isBlinking = true;
        this.blinkState.longBlinkStart = now;
      } else {
        // Check for long blink
        if (now - this.blinkState.longBlinkStart >= this.blinkState.longBlinkThreshold) {
          if (!this.nextBtn.disabled) {
            this.nextQuestion();
            this.gestureFeedback.textContent = 'Next →';
            this.blinkState.longBlinkStart = now + 3000; // Prevent repeated triggers
          }
        }
      }
    } else {
      if (this.blinkState.isBlinking) {
        // Blink ended
        this.blinkState.isBlinking = false;
        const blinkDuration = now - this.blinkState.longBlinkStart;

        // Short blink
        if (blinkDuration < this.blinkState.longBlinkThreshold) {
          // Check for double blink
          if (now - this.blinkState.lastBlinkTime < this.blinkState.blinkWindow) {
            // Double blink - confirm selection
            if (!this.state.isAnswered) {
              this.selectOption(this.blinkState.currentOption);
              this.gestureFeedback.textContent = 'Selected!';
            }
            this.blinkState.blinkCount = 0;
          } else {
            // Single blink - cycle options
            this.blinkState.blinkCount = 1;
            this.blinkState.currentOption = (this.blinkState.currentOption + 1) % 4;
            
            // Highlight current option
            const buttons = this.optionsGrid.querySelectorAll('.option-btn');
            buttons.forEach((btn, i) => {
              if (i === this.blinkState.currentOption && !this.state.isAnswered) {
                btn.style.border = '3px solid var(--primary)';
              } else if (!this.state.isAnswered) {
                btn.style.border = '2px solid rgba(255, 255, 255, 0.1)';
              }
            });

            const labels = ['A', 'B', 'C', 'D'];
            this.gestureFeedback.textContent = `Option ${labels[this.blinkState.currentOption]}`;
          }

          this.blinkState.lastBlinkTime = now;
        }
      }
    }
  }

  calculateEAR(landmarks, eye) {
    // Eye landmarks indices
    const indices = eye === 'left' 
      ? { p1: 33, p2: 160, p3: 158, p4: 133, p5: 153, p6: 144 }
      : { p1: 362, p2: 385, p3: 387, p4: 263, p5: 373, p6: 380 };

    const p1 = landmarks[indices.p1];
    const p2 = landmarks[indices.p2];
    const p3 = landmarks[indices.p3];
    const p4 = landmarks[indices.p4];
    const p5 = landmarks[indices.p5];
    const p6 = landmarks[indices.p6];

    // Calculate distances
    const vertical1 = Math.sqrt(Math.pow(p2.x - p6.x, 2) + Math.pow(p2.y - p6.y, 2));
    const vertical2 = Math.sqrt(Math.pow(p3.x - p5.x, 2) + Math.pow(p3.y - p5.y, 2));
    const horizontal = Math.sqrt(Math.pow(p1.x - p4.x, 2) + Math.pow(p1.y - p4.y, 2));

    // Eye Aspect Ratio
    const ear = (vertical1 + vertical2) / (2.0 * horizontal);
    return ear;
  }

  stopCamera() {
    console.log('Stopping camera...');
    
    if (this.camera) {
      try {
        this.camera.stop();
      } catch (e) {
        console.error('Error stopping camera:', e);
      }
      this.camera = null;
    }

    if (this.videoElement && this.videoElement.srcObject) {
      this.videoElement.srcObject.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          console.error('Error stopping track:', e);
        }
      });
      this.videoElement.srcObject = null;
    }

    if (this.cameraPreview) {
      this.cameraPreview.style.display = 'none';
    }
    
    if (this.gestureFeedback) {
      this.gestureFeedback.textContent = '';
    }
    
    this.hands = null;
    this.faceMesh = null;
    
    console.log('Camera stopped');
  }

  // ==========================================
  // UI HELPERS
  // ==========================================

  toggleControls() {
    this.controlsContent.classList.toggle('active');
  }

  showHelp() {
    this.helpModal.classList.add('active');
    this.modalClose.focus();
  }

  closeHelp() {
    this.helpModal.classList.remove('active');
    this.controlsToggle.focus();
  }

  showStatus(message, type = 'info') {
    this.statusMessage.textContent = message;
    this.statusMessage.className = 'status-message show';

    if (type === 'success') {
      this.statusMessage.style.borderColor = 'var(--success)';
    } else if (type === 'error') {
      this.statusMessage.style.borderColor = 'var(--error)';
    } else {
      this.statusMessage.style.borderColor = 'var(--primary)';
    }

    setTimeout(() => {
      this.statusMessage.classList.remove('show');
    }, 3000);
  }
}

// ==========================================
// INITIALIZE APPLICATION
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
  const quiz = new AdTechQuiz();
  
  // Make quiz globally accessible for debugging
  window.adTechQuiz = quiz;
});
