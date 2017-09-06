using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Line.Bll.Abstract
{
    public interface ICacheStoreHelper<T>
    {
        T this[string key] { get; }

        void Add(string key, T value);

        void Add(string key, T value, TimeSpan expirationTime);

        void Remove(string key);

        void RemoveContains(string key);

        bool ContainsKey(string key);

        void Clear();
    }
}
