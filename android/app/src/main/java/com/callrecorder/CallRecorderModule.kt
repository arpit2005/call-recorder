package com.callrecorder

import android.media.MediaRecorder
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.IOException

class CallRecorderModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
  private var mediaRecorder: MediaRecorder? = null
  private var isRecording = false

  override fun getName() = "CallRecorder"

  @ReactMethod
  fun startRecording(path: String) {
    if (isRecording) return

    try {
      mediaRecorder = MediaRecorder().apply {
        setAudioSource(MediaRecorder.AudioSource.MIC)
        setOutputFormat(MediaRecorder.OutputFormat.AAC_ADTS) // AAC format
        setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
        setAudioChannels(1) // Mono channel
        setAudioSamplingRate(44100) // 44.1 kHz sample rate
        setAudioEncodingBitRate(128000) // 128 kbps bitrate
        setOutputFile(path)
        prepare()
        start()
        isRecording = true
      }
    } catch (e: IOException) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  fun stopRecording() {
    mediaRecorder?.apply {
      try {
        stop()
        release()
      } catch (e: Exception) {
        e.printStackTrace()
      }
    }
    mediaRecorder = null
    isRecording = false
  }
}