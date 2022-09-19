import cn from 'clsx'

interface LoadingProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Loading: React.FC<LoadingProps> = ({ className, size = 'md' }) => {
    
  return (
    <span className={cn('dot-container inline-flex text-center items-center leading-7', size, className)}>
      <span className='dot round' key={`dot_1`} />
      <span className='dot round' key={`dot_2`} />
      <span className='dot round' key={`dot_3`} />
    </span>
  )
}

export default Loading